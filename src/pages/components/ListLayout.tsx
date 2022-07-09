import { alpha, InputBase, Collapse, Toolbar, Fab, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import React, { useState } from "react";

import Layout from "./Layout";
import Link from 'next/link';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const CollapseFab = styled(Fab)(({ theme }) => ({
  margin: '15px', 
  backgroundColor: '#7289DA', 
  position: 'absolute', 
  top: '65px',
  opacity: 0.3,
  transition: 'all 0.5s ease-out',
  '&:hover': {
    backgroundColor: '#7289DA',
    opacity: 0.7,
  },
})); 

export default function ListLayout(props: { children: JSX.Element, index: number, onSearch?: (query: string)=>void }) {
  const [shown, setShown] = useState(true);
  const [query, setQuery] = useState('');

  const handleCollapse = async (event: React.MouseEvent) => {
    setShown(prevState => !prevState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: React.KeyboardEvent) => {
    if(event.code === "Enter") {
      console.log(props);
      if(props.onSearch) props.onSearch(query);
    }
  }

  return (
    <Layout header={
      <>
        <Collapse in={shown} sx={{backgroundColor: '#7289DA',}}>
          <Toolbar sx={{ml: '20px'}}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={query} 
                onChange={handleChange} 
                onKeyDown={handleSubmit}
              />
            </Search>
            <Tabs value={props.index} aria-label="basic tabs example">
              <Link href='/voteList'><Tab label="추천" /></Link>
              <Link href='/recentList'><Tab label="최신" /></Link>
              <Link href='/searchList'><Tab label="검색" /></Link>
            </Tabs>
          </Toolbar>
        </Collapse>

        <CollapseFab size='medium' onClick={handleCollapse} sx={[shown && {boxShadow: 'none'}]} >
          {shown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </CollapseFab>
      </>
    }>
      {props.children}
    </Layout>
  )
}