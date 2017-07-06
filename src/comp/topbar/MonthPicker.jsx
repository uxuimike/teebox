import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

import Highlight from '../../img/highlightCircle.svg';
import CalIcon from '../../img/calendar.svg';

@inject('styles', 'calendar') @observer
export default class MonthPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  onToggle(){
    this.props.onToggleMonth();
  }

  render(){

    const aStyle = StyleSheet.create({
      comp: {
        position: 'absolute',
        overflow: 'hidden',
        top: '0',
        left: '0px',
        display: 'block',
        boxSizing: 'border-box',
        width: '64px',
        padding: '16px 0 0 0',
        backgroundImage: 'url(' + CalIcon + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '28px 28px',
        backgroundPosition: 'center 60%',
        backgroundColor: 'rgba(0, 0, 0, .1)',
        fontFamily: 'Font-Light',
        color: this.props.styles.colors.onPrimary1,
        fontSize: '14px',
        textAlign: 'center',
        cursor: 'pointer',
        zIndex: this.props.styles.zIndex.Cal,
        transition: this.props.styles.transitions.calendar
      }
    });

    let compStyle = {
      height: this.props.height + 'px',
    };


    return(
      <div className={css(aStyle.comp)} style={compStyle} onClick={this.onToggle.bind(this)}>
        {this.props.calendar.months[this.props.calendar.selectedDay.getMonth()]}
      </div>
    )
  }

};
