import { observable } from 'mobx'
import { action } from 'mobx'

class UserStore {
  @observable name = "Mike"

  @observable things = ['shoes', 'belt', 'hat']

  @action addThing(value) {
    this.things.push(value)
  }
}

export default new UserStore();
