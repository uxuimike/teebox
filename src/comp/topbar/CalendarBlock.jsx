import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

import Highlight from '../../img/highlightCircle.svg';

@inject('styles', 'calendar') @observer
export default class CalendarBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      animation: 'none'
    }
  }

  componentWillMount(){
    if(this.props.active) {
      this.setState({
        active: true,
        animation: 'HighlightCircleIn'
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.active !== this.props.active){
      if (nextProps.active){
        this.setState({
          active: true,
          animation: 'HighlightCircleIn'
        });
      }else if (this.state.active){
        this.setState({
          active: false,
          animation: 'HighlightCircleOut'
        });
      }
    }
  }

  renderConditionalComponent(sty) {
    if (this.props.day.today){
      return <div id='today' className={sty} />
    }else {
      return
    }
  }

  onSelect(){
    this.props.onSelect(this.props.day.day);
  }

  render(){

    const aStyle = StyleSheet.create({
      comp: {
        display: 'block',
        float: 'left',
        boxSizing: 'border-box',
      	width: '12.5%',
        height: '72px',
      	margin: '0',
      	padding: '16px 0 0 0',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.2s',
        backgroundImage: 'url(' + Highlight + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '0%',
        backgroundPosition: 'center center',
        animationDuration: '0.2s',
        animationIterationCount: '1',
        animationFillMode: 'forwards'
      },
      bgAnimation: {
        animationName: this.state.animation
      },
      l1: {
        margin: '0',
        padding: '2px',
        fontFamily: 'Font-Light',
        color: this.props.styles.colors.onPrimary1,
        fontSize: '14px',
      },
      l2: {
        display: 'block',
        margin: '-2px 0 0 0',
        padding: '0',
        fontFamily: 'Font-Light',
        color: this.props.styles.colors.onPrimary2,
        fontSize: '24px',
      },
      todayS: {
        width: '4px',
        height: '4px',
        margin: '0px auto 0 auto',
        backgroundColor: this.props.styles.colors.onPrimary1,
        borderRadius: '4px'
      }
    });


    return(
      <div  className={css(aStyle.comp) + ' ' + css(aStyle.bgAnimation) } onClick={this.onSelect.bind(this)}>
        <label className={css(aStyle.l1)}>{this.props.day.dow}</label>
        <label className={css(aStyle.l2)}>{this.props.day.num}{this.props.active}</label>
        {this.renderConditionalComponent(css(aStyle.todayS))}
      </div>
    )
  }

};
