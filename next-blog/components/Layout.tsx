import React from 'react';
import styles from './layout.module.css';
import { NavBar } from './Nav';

export default function Layout({ children }: any) {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
    </>
  );
}
