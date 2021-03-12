import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';

import style from './style.css';

const Header: FunctionalComponent = () => {
  return (
    <header class={`${style.header} glass`}>
      <h1>Syn3h</h1>
      <nav>
        <Link activeClassName={style.active} href="/">
          Play
        </Link>
        <Link activeClassName={style.active} href="/settings">
          Settings
        </Link>
        <Link activeClassName={style.active} href="/me">
          Account
        </Link>
        <Link activeClassName={style.active} href="/dev">
          Dev
        </Link>
      </nav>
    </header>
  );
};

export default Header;
