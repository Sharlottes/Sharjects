import React from 'react';
import { IAccount } from 'models/Account';

export interface IUser {
  loggedUser: IAccount,
  loggedIn: boolean,
  setLoggedUser: (data: IAccount) => void,
  setLoggedIn: (isLoggedIn?: boolean) => void
};

const UserContext = React.createContext<IUser>({
  loggedUser: {
    userId: '',
    password: ''
  },
  loggedIn: false,
  setLoggedUser: () => { },
  setLoggedIn: () => { }
});

export default UserContext;