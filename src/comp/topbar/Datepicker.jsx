import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

import DayPicker from 'react-day-picker';
import '../../css/daypicker/style.scss';

@inject('styles', 'calendar') @observer
export default class Calendar extends Component {

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
            transform: 'translateY(-640rem)',
        },
        '100%': {
            transform: 'translateY(0)',
        },
    };

    const slideOut = {
        '0%': {
          transform: 'translateY(0)',
        },
        '100%': {
            transform: 'translateY(-640rem)',
        },
    };

    const aStyle = StyleSheet.create({
      comp: {
        position: 'absolute',
        top: '0',
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

    const today = this.props.calendar.today;

    return(
      <div  id='Datepicker' className={css(this.props.toggleMonth ? aStyle.showMonth : aStyle.hideMonth, aStyle.comp)}>
        <DayPicker
          month={this.props.calendar.selectedDay}
          fromMonth={today}
          onDayClick={ this.onSelectDay.bind(this)}
          selectedDays={ this.props.selectedDay }
          disabledDays={ { before: today }}
          weekdaysShort={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        />
      </div>
    )
  }

};
