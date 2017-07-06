import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('styles', 'user') @observer
export default class ToDo extends Component {

  createNew(e){
    if (e.which === 13){
      this.props.user.addThing(e.target.value)
      e.target.value = ''
    }
  }

  render(){

    let compStyle = {
    	width: '100%',
    	margin: '160px 16px 16px 16px',
    	padding: '0',
    	zIndex: this.props.styles.zIndex.TopBar
    };

    const stuff = this.props.user.things;

    const cList = stuff.map((stuff, index) =>
      // Only do this if items have no stable IDs
      <li key={index}>
        {stuff}
      </li>
    );


    return(
      <div id='TopDo' style={compStyle} >
        <input onKeyPress={this.createNew.bind(this)} />
        <div>{this.props.mes}{this.props.user.name}{this.props.styles.colors[1]}</div>
        <ul>
          {cList}
        </ul>
      </div>
    )
  }

};
