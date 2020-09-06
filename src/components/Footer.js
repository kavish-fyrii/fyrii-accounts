import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Symbol from '../resources/Symbol.png'
import './Footer.css';

const useStyles = makeStyles((theme) => ({
  footer: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={`site-footer ${classes.footer}`}>
      <div className='container'>
        <div className='site-footer-inner has-top-divider'>
          <div className='brand footer-brand'>
            <a href='http://fyrii.com'>
              <img src={Symbol} width='30px' height='auto' alt='symbol' />
            </a>
          </div>
          <ul className='footer-links list-reset'>
              <li>
                <a href='http://fyrii.com#contact' target='_blank' rel="noopener noreferrer">Contact</a>
              </li>
              <li>
                <a href='http://fyrii.com#about' target='_blank' rel="noopener noreferrer">About us</a>
              </li>
              <li>
                <a href='http://fyrii.com#faq' target='_blank' rel="noopener noreferrer">FAQ's</a>
              </li>
              <li>
                <a href='http://fyrii.com#support' target='_blank' rel="noopener noreferrer">Support</a>
              </li>
          </ul>
          <ul className='footer-social-links list-reset'>
            <li>
              <a href='https://facebook.com/fyrii' target='_blank' rel="noopener noreferrer">
                <span className='screen-reader-text'>Facebook</span>
                <svg width='16' height='16' xmlns='https://www.w3.org/2000/svg'>
                  <path d='M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z' fill='#FFF' />
                </svg>
              </a>
            </li>
            <li>
              <a href='https://twitter.com/fyrii' target='_blank' rel="noopener noreferrer">
                <span className='screen-reader-text'>Twitter</span>
                <svg width='16' height='16' xmlns='https://www.w3.org/2000/svg'>
                  <path d='M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z' fill='#FFF' />
                </svg>
              </a>
            </li>
          </ul>
          <div className='footer-copyright'>&copy; 2020 Fyrii, all rights reserved</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
