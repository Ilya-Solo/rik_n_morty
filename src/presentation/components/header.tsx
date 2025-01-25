import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <div className="logo-area">
            <Link href="/" className="logo">
              MyApp
            </Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/episodes" className="nav-link">
                  Episodes
                </Link>
              </li>
              <li>
                <Link href="/characters" className="nav-link">
                  Characters
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <style>{`
        .site-header {
          background-color: #0e6b50;
          padding: 10px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }

        .logo-area {
          flex-shrink: 0;
        }

        .logo {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
          text-decoration: none;
        }

        .logo:hover {
          text-decoration: underline;
        }

        .main-nav ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .main-nav li {
          margin-left: 20px;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-size: 1rem;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #0070f3;
        }
      `}</style>
    </>
  );
};

export default Header;
