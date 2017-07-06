import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

import CalendarBlock from './CalendarBlock.jsx';
import Datepicker from './Datepicker';
import MonthPicker from './MonthPicker';


@inject('styles', 'calendar') @observer
export default class Calendar extends Component {

  constructor() {
    super();
    this.state = {
      selectedDate: null,
      thisWeek: [],
      focused: false,
      toggleMonth: false
    }
  }

  componentWillMount(){
    this.createThisWeek(new Date());
  }

  createThisWeek(day){
    this.props.calendar.createWeek(day);
  }

  onSelectDay(day){
    this.props.calendar.setActive(day);
  }

  onSelectDayMonth(day){
    this.props.calendar.createWeek(day);
    this.setState({
      toggleMonth: false
    });
  }

  onToggleMonth(){
    if (this.state.toggleMonth){
      this.setState({
        toggleMonth: false
      });
    }else {
      this.setState({
        toggleMonth: true
      });
    }
  }

  render(){

    const aStyle = StyleSheet.create({
      comp: {
        boxSizing: 'border-box',
      	width: '100%',
      	margin: '0',
      	padding: '0',
        backgroundColor: this.props.styles.colors.primary1,
        overflow: 'hidden'
      },
      weekmonth: {
        width: '100%',
        margin: '0 0 0 12.5%',
        overflow: 'hidden'
      }
    });

    let week = this.props.calendar.week;

    const daysList = week.map(days => (
      <CalendarBlock day={days} active={days.active} onSelect={this.onSelectDay.bind(this)} key={days.key}/>
    ))

    return(
      <div  id='Calendar' className={css(aStyle.comp)} >
        <div className={css(aStyle.weekmonth)}>
          <MonthPicker onToggleMonth={this.onToggleMonth.bind(this)} height={500}/>
          {daysList}
          <div className='clear' />
        </div>
        <Datepicker toggleMonth={this.state.toggleMonth} onSelectDay={this.onSelectDayMonth.bind(this)} selectedDay={this.props.calendar.selectedDay}/>
        <div className='clear' />
      </div>
    )
  }

};
