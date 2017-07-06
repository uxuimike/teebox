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
        height: '56rem',
      	margin: '0',
      	padding: '14rem 0 0 16rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        fontFamily: 'Font-Light',
      },
      l1: {
        fontSize: '32rem',
        color: this.props.styles.colors.onPrimary1
      },
      l2: {
        fontSize: '24rem',
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
