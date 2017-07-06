import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

import CalIcon from '../../img/calendar.svg';

@inject('styles') @observer
export default class MonthBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  onToggle(){
    console.log('Click');
  }

  render(){

    const aStyle = StyleSheet.create({
      comp: {
        display: 'block',
        boxSizing: 'border-box',
        width: '64rem',
        height: '64rem',
        padding: '16rem 0 0 0',
        backgroundImage: 'url(' + CalIcon + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '28rem 28rem',
        backgroundPosition: 'center 60%',
        backgroundColor: 'rgba(0, 0, 0, .1)',
        fontFamily: 'Font-Light',
        color: this.props.styles.colors.onPrimary1,
        fontSize: '14rem',
        textAlign: 'center',
        cursor: 'pointer',
        zIndex: this.props.styles.zIndex.Cal,
        transition: this.props.styles.transitions.calendar
      }
    });

    return(
      <div className={css(aStyle.comp)} onClick={this.onToggle.bind(this)}>
        {this.props.month}
      </div>
    )
  }

};
