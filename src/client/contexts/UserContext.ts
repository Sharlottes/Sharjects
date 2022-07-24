import React from 'react';
import Router from 'next/router';
import { IAccount, IAccountDocument } from 'models/Account';

export interface IAccountContext {
  loggedIn: boolean
  loggedAccount?: IAccount
  updateAccount: (account: IAccount) => void
  logIn: (account: IAccountDocument) => void
  logOut: () => void
};

export type UseAccountOptions = {
  redirectTo?: string
}
export const useAccount: (options: UseAccountOptions) => IAccountContext =
  ({ redirectTo = '/login' }) => {
    const account = React.useContext(UserContext);

    React.useEffect(() => {
      if (!account.loggedIn) Router.push(redirectTo)
    }, [account, redirectTo])

    return account;
  }

const UserContext = React.createContext<IAccountContext>({
  loggedIn: false,
  updateAccount: () => { },
  logIn: () => { },
  logOut: () => { }
});
export default UserContext;