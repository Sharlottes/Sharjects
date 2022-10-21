

import React from 'react'
import { signIn, useSession } from "next-auth/react"

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Snackbar, { type SnackbarProps } from '@mui/material/Snackbar'

import { useSnackbar } from 'notistack'

declare module 'notistack' {
  interface VariantOverrides {
    test: {
      duration?: boolean,
    } & Partial<Record<Exclude<keyof SnackbarProps, 'action' | 'anchorOrigin'>, boolean>>
  }
}

const AuthWrapper: React.FC<{ children: JSX.Element, auth: any }> = ({ children, auth }) => {
  const { status } = useSession({ required: Boolean(auth) })
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(() => {
    console.log(status);
    if (status !== "unauthenticated") return;

    const id = setTimeout(() => {
      if (status !== "unauthenticated") return;
      enqueueSnackbar('you are not logged in', {
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        action: (id: any) =>
          <>
            <Button
              onClick={() => signIn()}
              sx={{
                transition: 'color,background-color 200ms cubic-bezier(.17,1.78,.74,-1.02)',
                color: 'primary.main',
                "&:hover": {
                  color: 'white',
                  backgroundColor: 'primary.main'
                }
              }}
            >
              Log In
            </Button>
            <IconButton onClick={() => closeSnackbar(id)}>
              <CloseIcon sx={{ transition: 'color 200ms', "&:hover": { color: 'primary.main' } }} />
            </IconButton>
          </>
      })
    }, 1000);
    return () => clearTimeout(id);
  }, [status])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

export default AuthWrapper;