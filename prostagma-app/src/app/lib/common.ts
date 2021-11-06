import {Users} from '../../../../models/Users';

export class Common {

  public checkIfExists(users: Users[], user: Users, pop: boolean): Users[] {
    let i = 0;
    let exists = false;
    while (i < users.length) {
      if (users[i]._id === user._id) {
        if (pop) {
          users.splice(i, 1);
        }
        exists = true;
      }
      i++;
    }
    if (!exists) {
      users.push(user);
    }
    return users;
  }
}
