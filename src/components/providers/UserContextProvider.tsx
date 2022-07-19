import React from 'react'
import UserContext, { IUser } from 'src/contexts/UserContext';
import { IAccount } from 'models/Account';

const UserContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const setLoggedUser = (data: IAccount) => {
    setState(prev => ({
      ...prev, loggedUser: data, loggedIn: true
    }))
  }

  const setLoggedIn = () => {
    setState(prev => {
      if (prev.loggedIn) return { ...prev, loggedIn: !prev, loggedUser: { userId: '', password: '' } };
      return { ...prev, loggedIn: !prev };
    })
  }

  const initState: IUser = {
    loggedUser: {
      userId: '',
      password: ''
    },
    loggedIn: false,
    setLoggedUser,
    setLoggedIn
  }
  const [state, setState] = React.useState<IUser>(initState);

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;