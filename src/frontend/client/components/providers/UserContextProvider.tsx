import React from 'react'
import * as ReactCookie from 'react-cookie'
import UserContext, { IContextAccount } from 'src/frontend/client/contexts/UserContext'
import { IAccount } from 'models/Account'
import { always } from 'src/utils/always'

const UserContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = ReactCookie.useCookies(['rememberAccountId'])

  const initState: IContextAccount = {
    loggedIn: Boolean(cookies.rememberAccountId),
    updateAccount: (account: IAccount) => {
      setState(({ loggedAccount, loggedIn, ...prev }) => ({ ...prev, loggedAccount: account, loggedIn: true }))
    },
    logIn: (account: IAccount) => {
      setCookie('rememberAccountId', account.id)
      state.updateAccount(account)
    },
    logOut: () => {
      removeCookie('rememberAccountId')
      setState(prev => ({ ...prev, loggedIn: false }))
    }
  }
  const [state, setState] = React.useState<IContextAccount>(initState)

  React.useEffect(() => {
    if (cookies.rememberAccountId) {
      fetch(`/api/account/find?id=${cookies.rememberAccountId}`)
        .then(res => always<Promise<IAccount>>(res.json(), console.log(res)))
        .then((account) => {
          setState(({ loggedIn, ...prev }) => ({ ...prev, loggedIn: true, loggedAccount: account }))
        })
    }
  }, [setState, cookies.rememberAccountId])

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider