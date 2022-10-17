

import React from 'react'
import { signIn, useSession } from "next-auth/react"

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import { useSnackbar } from 'notistack'

const AuthWrapper: React.FC<{ children: JSX.Element, auth: any }> = ({ children, auth }) => {
  const { status } = useSession({ required: Boolean(auth) })
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (status !== "unauthenticated") return;

    const id = setTimeout(() => {
      if (status !== "unauthenticated") return;
      enqueueSnackbar('you are not logged in', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        action: (id) =>
          <>
            <Button onClick={() => signIn()}>Log In</Button>
            <IconButton onClick={() => closeSnackbar(id)}><CloseIcon /></IconButton>
          </>,
        autoHideDuration: 5000
      })
    }, 3000);
    return () => clearTimeout(id);
  }, [])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

export default AuthWrapper;