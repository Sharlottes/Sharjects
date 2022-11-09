

import React from 'react'
import { signIn, useSession } from "next-auth/react"

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import { useSnackbar } from 'notistack'

import type {} from 'src/@type'

const AuthWrapper: React.FC<{ children: JSX.Element, auth: any }> = ({ children, auth }) => {
  const { status } = useSession({ required: Boolean(auth) })
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (status !== "unauthenticated") return;

    const id = setTimeout(() => {
      if (status !== "unauthenticated") return;
      enqueueSnackbar('you are not logged in', {
        preventDuplicate: true,
        variant: 'lifebar',
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