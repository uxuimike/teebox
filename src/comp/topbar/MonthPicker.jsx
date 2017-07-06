import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

import MonthBlock from './MonthBlock.jsx';
import CalIcon from '../../img/calendar.svg';

@inject('styles', 'calendar') @observer
export default class MonthPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  componentWillMount(){
    this.props.calendar.createMonths();
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
        left: '0',
        display: 'block',
        boxSizing: 'border-box',
        width: '64rem',
        cursor: 'pointer',
        zIndex: this.props.styles.zIndex.Cal,
        transition: this.props.styles.transitions.calendar
      }
    });

    let compStyle = {
      height: this.props.height + 'rem',
    };

    let selectedMonth = this.props.calendar.selectedDay.getMonth();

    let months = this.props.calendar.months;

    const monthList = months.map((month, index) => (
      <MonthBlock  key={index} month={months[index]}/>
    ))


    return(
      <div className={css(aStyle.comp)} style={compStyle} onClick={this.onToggle.bind(this)}>
        {monthList}
      </div>
    )
  }

};
