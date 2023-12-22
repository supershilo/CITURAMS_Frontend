import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items  text-white'>
            <h2 className='font-bold'>Contact Us</h2>
            +63 32 411 2000<br/>
            citurams@cit.edu
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items text-white' >
            <h2 className='font-bold'>Address</h2>
            	N. Bacalso Avenue, <br/>Cebu City ,Philippines 6000
          </div>
          <div class='footer-link-items text-white'>
            <h2 className='font-bold'>Office Hours</h2>
            8:00 AM - 5:00 PM<br/>
            Monday - Friday
          </div>
          <div class='footer-link-items'>
            <h2 className='font-bold'>Social Media</h2>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
      <small class='website-rights'>CopyRights © 2023 | All Rights Reserved</small>
    </div>
  );
}

export default Footer;
