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
    var sf = 1;
    var cw = window.innerWidth;
    var ch = window.innerHeight;

    if (cw > ch) {
      sf = (ch)/640;
    }else {
      sf = (cw)/640;
    }

    if (sf > 1) {
      sf = 1;
    }

    document.documentElement.style.fontSize = sf + 'px';

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
      <div className="App" >
        <SearchPage />
      </div>

    )
  }
}
