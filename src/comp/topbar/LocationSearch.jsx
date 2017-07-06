import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite/no-important';

@inject('styles', 'user') @observer
export default class LocationSearch extends Component {

  render(){

    const aStyle = StyleSheet.create({
      comp: {

        boxSizing: 'border-box',
      	width: '100%',
        height: '56px',
      	margin: '0',
      	padding: '14px 0 0 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        fontFamily: 'Font-Light',
      },
      l1: {
        fontSize: '32px',
        color: this.props.styles.colors.onPrimary1
      },
      l2: {
        fontSize: '24px',
        color: this.props.styles.colors.onPrimary2
      }
    });

    return(
      <div id='LocationSearch' className={css(aStyle.comp)} >
        <label className={css(aStyle.l1)} >Orlando</label>
        <label className={css(aStyle.l2)}>, FL</label>
      </div>
    )
  }

};
