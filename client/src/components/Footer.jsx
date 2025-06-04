import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="8"
      height="8"
      style={{ marginLeft: '5px'}}
    >
      <path d="M14.25 3h6a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0V4.81L4.81 20.25a.75.75 0 01-1.06-1.06L18.44 3.75h-4.19a.75.75 0 010-1.5z" />
    </svg>
  );

  return (
    <div className="footer">
      <div className="footer--container">
        <div className="footer-left">
          <h4><i>Starter</i></h4>
          <p>Designed for developers, storytellers, thinkers, and dreamers everywhere.</p>
        </div>
        <div className="footer-right">
          <ul>
            <li>
              <a href="https://github.com/temiicode">
                Github <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="">
                LinkedIn <ArrowIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-year">
        <p>&copy; {year} All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;