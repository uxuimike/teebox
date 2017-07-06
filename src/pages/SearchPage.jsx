import React, { Component } from 'react';

import Menu from '../comp/menu/Menu.jsx';
import TopBar from '../comp/topbar/TopBar.jsx';
import Todo from '../comp/ToDo.jsx';


export default class SearchPage extends Component {

  render(){

    return(
      <div>
        <Menu />
        <TopBar />
      </div>
    )
  }

}
