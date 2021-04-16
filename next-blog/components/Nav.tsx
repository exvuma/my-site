import { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
};
export const NavBar = ({}: Props) => {
  return (
    <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
      <div className='container'>
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <a className='navbar-brand' href='/'>
            <img src='src/2016/04/Victoria_logo_gear.png' alt='' />
          </a>
        </div>
        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav'>
            <li>
              <a href='/'>About</a>
            </li>
            <li>
              <a href='/cv.html'>CV</a>
            </li>
            <li>
              <a href='/projects.html'>Projects</a>
            </li>
            <li>
              <Link href='/posts'>
                <a>Blog</a>
              </Link>
            </li>
          </ul>
        </div>
        {/* <!-- /.navbar-collapse --> */}
      </div>
      {/* <!-- /.container --> */}
    </nav>
  );
};
