import React, { Component } from 'react';


export default class TopBar extends Component {

  render(){

    let Sty = {
      position: 'fixed',
    	top: '0px',
    	left: '0px',
    	backgroundColor: 'rgb(25, 165, 125)',
    	width: '100%',
      height: '50px',
    	margin: '0px',
    	padding: '0',
    	zIndex: '410'
    };

    return(
      <div id='TopBar' style={Sty} >

      </div>
    )
  }

}
