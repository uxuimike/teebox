import { observable } from 'mobx';
import { action } from 'mobx';

class StyleStore {
  colors = {
    primary1: 'rgb(25, 165, 125)',
    primary2: 'rgb(77, 77, 77)',
    onPrimary1: 'rgba(255, 255, 255, 0.8)',
    onPrimary2: 'rgba(255, 255, 255, 0.6)'
  }

  zIndex = {
    Menu: 999,
    TopBar: 800,
    row2: 801,
    Cal: 802,
    row1: 803,
  }

  transitions = {
    calendar: 'height 0.6s'
  }

  @observable view = {
    width: 640,
    height: 960,
    scale: 10
  }

  @action setView(w, h, s) {
    this.view = {width: w, height: h, scale: s};
  }

}

export default new StyleStore();
