import React from 'react'
import { useCookies } from 'react-cookie'
import UserContext from 'src/client/contexts/UserContext'
import type { IAccountContext } from 'src/client/contexts/UserContext'
import type { IAccount, IAccountDocument } from 'models/Account'
import { always } from 'src/utils/always'

const UserContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['rememberAccountId'])

  const initState: IAccountContext = {
    loggedIn: Boolean(cookies.rememberAccountId),
    updateAccount: (account: IAccount) => {
      setState(({ loggedAccount, loggedIn, ...prev }) => ({ ...prev, loggedAccount: account, loggedIn: true }))
    },
    logIn: (account: IAccountDocument) => {
      setCookie('rememberAccountId', account._id)
      state.updateAccount(account)
    },
    logOut: () => {
      removeCookie('rememberAccountId')
      setState(prev => ({ ...prev, loggedIn: false }))
    }
  }
  const [state, setState] = React.useState<IAccountContext>(initState)

  React.useEffect(() => {
    if (cookies.rememberAccountId) {
      fetch(`/api/account?id=${cookies.rememberAccountId}`)
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