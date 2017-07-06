import React, { Component } from 'react';
import { inject } from 'mobx-react';
import ham from '../../img/hamburger.svg';
import { StyleSheet, css } from 'aphrodite/no-important';

@inject('styles')
export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      open: ''
    }
  }

  onHamburger() {
    if (this.state.open === 'is-active'){
      this.setState({ open: '' });
    }else {
      this.setState({ open: 'is-active' });
    }
  }

  render(){

    const aStyle = StyleSheet.create({
      comp: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        margin: '0px',
        padding: '0px',
        zIndex: this.props.styles.zIndex.Menu
      },
      ham: {
        backgroundImage: 'url(' + ham + ')',
        height: '64rem',
        width: '64rem',
        margin: '0px',
        padding: '0px',
        border: 'none'
      },
      wrap: {
        display: 'none'
      }
    });

    return(
      <nav id='MainMenu' className={css(aStyle.comp)}>
          <div type='button' className={css(aStyle.ham)} onClick={this.onHamburger.bind(this)}  />
        <div id='MenuWrap' className={css(aStyle.wrap)}>
          <ul>
            <a to="work" onClick={this.onHamburger.bind(this)} ><li>Work</li></a>
            <a to="blog" onClick={this.onHamburger.bind(this)} ><li>Blog</li></a>
          </ul>
        </div>
      </nav>
    )
  }
}
