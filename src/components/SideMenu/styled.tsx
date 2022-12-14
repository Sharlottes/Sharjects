import React from 'react'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { experimental_sx, styled } from '@mui/system'

export const OwnerRow = styled('div')<{ color: string }>(({ color }) => (
  experimental_sx({
    display: 'flex',
    "& .highlight": {
      fontSize: 16,
      transition: 'color 150ms ease-in'
    },
    "&:hover": {
      "& .highlight": {
        color
      }
    },
    "& .profile-image": {
      borderRadius: '20px', marginRight: '5px',
      width: '20px', height: '20px'
    },
  })
))

export const ProjectRow = styled('div')<{ color: string }>(({ color }) => (
  experimental_sx({
    margin: '3px 0',
    display: 'flex', justifyContent: 'space-between',
    "& .highlight": {
      transition: 'transform 100ms ease',
      transform: 'translateX(35px)',
      display: 'flex', alignItems: 'center',
      "& p": {
        transition: 'color 100ms ease',
      },
      "& .project-icon": {
        width: '1rem', height: '1rem',
        marginRight: '5px'
      },
    },
    "& .links": {
      display: 'flex', flexDirection: 'row-reverse',
      "& .MuiSvgIcon-root": {
        transform: 'scale(0.8)',
        color: 'lightgray',
        transition: 'color 300ms ease-out',
        "&:hover": {
          color: 'text.primary'
        }
      },
    },
    "&:hover": {
      "& .highlight": {
        transform: 'translateX(50px)',
        "& p": { color },
      },
    },
  })
))

export const LinksContainer = styled('div')(
  experimental_sx({
    display: 'flex', justifyContent: 'space-evenly',
    "& a": {
      transition: 'transform 200ms',
      transform: 'translateY(0)',
      color: 'inherit',
      "&:hover": { transform: 'translateY(-5px)' }
    }
  })
)