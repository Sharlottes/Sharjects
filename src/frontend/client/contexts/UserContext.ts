import React from 'react'
import { IAccount } from 'models/Account'

export interface IContextAccount {
  loggedIn: boolean
  loggedAccount?: IAccount
  updateAccount: (account: IAccount) => void
  logIn: (account: IAccount) => void
  logOut: () => void
}

const UserContext = React.createContext<IContextAccount>({
  loggedIn: false,
  updateAccount: () => { },
  logIn: () => { },
  logOut: () => { }
})

export default UserContext