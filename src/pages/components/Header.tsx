import Link from 'next/link';
import { Component, ReactNode } from 'react';
import discord from './discord.svg';
import setting from './setting.svg';
import Head from "next/head";

const links: {url: string, name: string}[] = [];
(()=>{
  function addLink(url: string, name: string) {
    links.push({url: url, name: name});
  }
  addLink('/', 'Home');
  addLink('/about', 'About');
  addLink('/list', 'Bots');
  addLink('/search', 'Search');
})();

class Header extends Component {
  render(): ReactNode {
    return (
      <>
        <Head>
          <title>React App</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <div className='header'>
          <dl className='logo'>
            <img src={(discord as unknown as {src: string}).src} alt="discord" />
          </dl>
          <dl className='navigator'>
            {links.map((link, i) => <Link href={link.url} key={i}>{link.name}</Link>)}
          </dl>
          <dl className='icons'>
            <img src={(setting as unknown as {src: string}).src} alt="setting" />
          </dl>
        </div>
      </>
    )
  }
}

export default Header;