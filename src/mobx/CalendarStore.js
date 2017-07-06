import { observable } from 'mobx'
import { action } from 'mobx'

class CalendarStore {
  dow =  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @observable months = [];

  today = new Date();

  @observable week = [];

  @observable selectedDay = null;

  @action setActive(value) {
    this.selectedDay = value;
    console.log(value.getMonth());
    for (var i = 0; i < this.week.length; i++){
      if (this.week[i].day.toDateString() === value.toDateString()) {
        this.week[i].active = true;
      }else {
        this.week[i].active = false;
      }

    }
  }

  @action createWeek(d) {
    this.selectedDay = new Date(d);
    this.week.clear();
    for (var i = 0; i < 7; i++){
        if (i === 0){
          this.week.push({key: i, day: new Date(d), dow: this.dow[d.getDay()], num: d.getDate(), today: true, active: true});
        }else {
          this.week.push({key: i, day: new Date(d), dow: this.dow[d.getDay()], num: d.getDate(), today: false, active: false});
        }
        d.setDate(d.getDate() + 1);
      }
  }

  @action createMonths(d) {
    this.months.clear();
    this.months = this.monthNames.slice(this.today.getMonth()).concat(this.monthNames.slice(0, this.today.getMonth()));
  }

}

export default new CalendarStore();
