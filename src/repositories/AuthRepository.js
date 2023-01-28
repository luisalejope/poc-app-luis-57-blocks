import {users} from '../data/users';

export default {
  authenticate({email, password}) {
    const userAuth = users.filter((user) => user.email === email && user.password === password);
    if (userAuth?.length === 0) {
      return false;
    }
    const newUser = {
      email: userAuth[0].email,
      name: userAuth[0].name,
      token: userAuth[0].token
    };
    return newUser;
    
  },
};