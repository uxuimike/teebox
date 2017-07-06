import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

import DayPicker from 'react-day-picker';
import '../../css/daypicker/style.scss';

@inject('styles', 'calendar') @observer
export default class Calendar extends Component {

  constructor() {
    super();
  }

  onFocus(foc){
    if (this.state.focused === false) {
      this.setState({
        focused: true,
      });
    }
  }

  onSelectDay(selected, disabled){
    if (disabled.disabled) {
      return
    }else {
      console.log();
      this.props.onSelectDay(selected);
    }
  }

  render(){

    const slideIn = {
        '0%': {
            transform: 'translateY(-600px)',
        },
        '100%': {
            transform: 'translateY(-72px)',
        },
    };

    const slideOut = {
        '0%': {
          transform: 'translateY(-72px)',
        },
        '100%': {
            transform: 'translateY(-600px)',
        },
    };

    const aStyle = StyleSheet.create({
      comp: {
        position: 'absolute',
        width: '100%',
        boxSizing: 'border-box',
        margin: '0',
        padding: '0',
        backgroundColor: this.props.styles.colors.primary1,
        animationDuration: '0.2s',
        animationIterationCount: '1',
        animationFillMode: 'forwards'
      },
      showMonth: {
        animationName: [slideIn],
      },
      hideMonth: {
        animationName: [slideOut],
      }
    });

    const today = new Date();
    const max = new Date();
    max.setFullYear(max.getFullYear()+1)

    return(
      <div  id='Datepicker' className={css(this.props.toggleMonth ? aStyle.showMonth : aStyle.hideMonth, aStyle.comp)}>
        <DayPicker
          month={this.props.selectedDay}
          fromMonth={today}
          toMonth={max}
          onDayClick={ this.onSelectDay.bind(this)}
          selectedDays={ this.props.selectedDay }
          disabledDays={ { before: today }}
          weekdaysShort={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        />
      </div>
    )
  }

};
