import React from 'react';
import styles from '../styles/Home.module.css'

const NavItem = ({ href, text }) => (
  <a className={styles.navButtonAnchor} href={href}>
    <li className={styles.navButton}>
        {text}
    </li>
  </a>
);

const Nav = () => {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem auto",
          listStyleType: "none",
          gap: "2rem"
        }}
      >
        <NavItem href="/" text="Valuations" />
        <NavItem href="/my-valuations" text="My Valuations" />
        <NavItem href="/about" text="About" />
      </ul>
    </nav>
  )
}

export default Nav;
