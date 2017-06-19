import React, { Component } from 'react';
import * as feedActs from '../actions/feedActions';
import {connect} from 'react-redux';
import {hashHistory} from "react-router";

import SearchList from './SearchList.jsx';

@connect((store) => {
    return {
        results : store.feed.search
    }
})

export default class SearchBar extends Component {

  constructor() {
    super();
    this.state = {
      search: '',
      resultsOpen: false,
      highlightNum: -1,
      highlight: -1
    }
    this.onKey = this.onKey.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKey, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKey, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      if (this.state.search.length > 0){
        this.setState({resultsOpen: true});
        this.loadFeed();
      }else {
        this.setState({resultsOpen: false});
      }
    };
  }

  loadFeed(){
    this.setState({
      highlightNum: -1,
      highlight: -1
    });
    if (this.state.search.length > 0){
      var hashI = this.state.search.indexOf('#');
      if (hashI > -1){
        var hash = this.state.search.slice(hashI + 1, this.state.search.length);
        this.props.dispatch(feedActs.getSearch('&tag=' + hash));
      }else {
        this.props.dispatch(feedActs.getSearch('search=' + this.state.search ));
      }
    }
  }

  onChange(event) {
      this.setState({search: event.target.value});
  }

  onBlur(event){
    this.setState({resultsOpen: false});
  }

  onFocus(){
    if(this.state.search.length > 0){
      this.setState({
        resultsOpen: true,
      });
    }
  }

  onClear(){
    this.setState({
      search: ''
    });
  }

  onKey(event){
    if(this.state.resultsOpen) {
      if (event.key === 'ArrowUp'){
        this.setHighlight(this.state.highlightNum - 1);
      }else if(event.key === 'ArrowDown'){
        this.setHighlight(this.state.highlightNum + 1);
      }else if(event.key === 'Enter'){
        this.loadHighlighted();
      }

    }
  }

  setHighlight(num){
    if (num > this.props.results.length - 1) {
      return
    }else if(num < 0) {
      this.setState({
        highlightNum: -1,
        highlight: -1
      });
      return
    }
    this.setState({
      highlightNum: num,
      highlight: this.props.results[num].id
    });
  }

  loadHighlighted(){
    if (this.state.highlightNum < this.props.results.length && this.state.highlightNum  > -1) {
      hashHistory.push('blog?' + this.props.results[this.state.highlightNum].slug);
      this.setState({
        search: ''
      });
    }

  }

  render(){

    let posts = this.props.results;
    let blockList = posts.map((posts) =>
      <SearchList
        click={this.onClear.bind(this)}
        key={posts.id}
        id={posts.id}
        category={posts.tag}
        title={posts.title}
        img={posts.img}
        slug={posts.slug}
        highlight={this.state.highlight}
      />
    );

    return(
      <div className="SearchWrap" >
        <div className='SearchField'>
          <input
            type='text'
            value={this.state.search}
            onChange={this.onChange.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onKeyPress={this.onKey.bind(this)}
            placeholder='Search text or use a # to search for a tag'>
          </input>
          <button className='SearchClear' onClick={this.onClear.bind(this)} style={{display: this.state.search.length > 0 ? 'block' : 'none'}}></button>
        </div>
        <div className='Search-Results' style={{display: this.state.resultsOpen > 0 ? 'block' : 'none'}}>
          <div className='Search-Count'>
            <span className='Search-Count-Number'>{this.props.results.length}</span> Results for: <span className='Search-Count-Number'>{this.state.search}</span>
            <a onClick={this.onClear.bind(this)}>Clear</a>
          </div>
          {blockList}
        </div>
        <div onClick={this.onBlur.bind(this)} className='Search-Catch-Click' style={{display: this.state.resultsOpen > 0 ? 'block' : 'none'}}></div>
      </div>
    )
  }
}
