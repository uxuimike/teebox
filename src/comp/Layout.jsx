import React, { Component } from 'react';
import { inject} from 'mobx-react';

import SearchPage from '../pages/SearchPage.jsx';

@inject('styles')
export default class Layout extends Component {

  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener("scroll", this.onScroll);
    this.onResize();
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener("scroll", this.onScroll);
  }

  onResize(){
    var sf = 10;
    var cw = window.innerWidth;
    var ch = window.innerHeight;

    if (cw > ch) {
      sf = 10 * (ch)/640;
    }else {
      sf = 10 * (cw)/640;
    }

    if (sf > 10) {
      sf = 10;
    }
    this.props.styles.setView(cw, ch, sf);
  }

  onScroll(){
    this.sp = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    //Set how often we want onScroll to dispatch
    if (this.sp > this.props.scrollPos + 10 || this.sp < this.props.scrollPos - 10) {
      //this.props.dispatch(viewActs.setScroll(this.sp));
    }
  }

  render(){
    return(
      <div className="App">
        <SearchPage />
      </div>

    )
  }
}
