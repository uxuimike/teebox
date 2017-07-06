import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

import LocationSearch from './LocationSearch.jsx';
import Calendar from './Calendar.jsx';

@inject('styles', 'user') @observer
export default class TopBar extends Component {

  createNew(e){
    if (e.which === 13){
      this.props.user.addThing(e.target.value)
      e.target.value = ''
    }
  }

  render(){

    const aStyle = StyleSheet.create({
      comp: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        backgroundColor: this.props.styles.colors.primary1,
        width: '100%',
        height: '128px',
        zIndex: this.props.styles.zIndex.TopBar
      },
      row1: {
        position: 'absolute',
        padding: '0 16px 0 80px',
        width: '100%',
        backgroundColor: this.props.styles.colors.primary1,
        zIndex: this.props.styles.zIndex.row1,
      },
      row2: {
        position: 'absolute',
        width: '100%',
        top: '56px',
        zIndex: this.props.styles.zIndex.row2
      }
    });

    return(
      <div id='TopBar' className={css(aStyle.comp)} >
        <div className={css(aStyle.row1)}>
          <LocationSearch />
        </div>
        <div className={css(aStyle.row2)}>
          <Calendar />
        </div>
      </div>
    )
  }

};
