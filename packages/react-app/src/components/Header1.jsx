import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header1({ acnt, setRoute }) {
  return (
    <header className="header ">
      <div className="header-absolute">
        <div className="content mod--header">
          <div className="header__columns">
            <div className="header__col">
              <a
                href="/"
                className="header__logo-link w-inline-block header-logo-link-a"
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                <img
                  src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a151e6a55be490586_logo.svg"
                  loading="lazy"
                  alt=""
                  className="header__logo-img"
                />
                Team Call_Byte
              </a>
            </div>
            <div className="header__col mod--2">
              <Link to="/" data-anim="link" className="header__nav-link w-inline-block">
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">Upload</div>
                  <div className="nav-txt">Upload</div>
                </div>
              </Link>
              <Link
                to="/library"
                data-anim="link"
                className="header__nav-link w-inline-block"
                onClick={() => {
                  setRoute("/library");
                }}
              >
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">Public Library</div>
                  <div className="nav-txt">Public Library</div>
                </div>
              </Link>

              <Link
                to="/privatelibrary"
                data-anim="link"
                className="header__nav-link w-inline-block"
                onClick={() => {
                  setRoute("/privatelibrary");
                }}
              >
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">Private Library</div>
                  <div className="nav-txt">Private Library</div>
                </div>
              </Link>
              <Link
                to="/history"
                data-anim="link"
                className="header__nav-link w-inline-block"
                onClick={() => {
                  setRoute("/history");
                }}
              >
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">Shared</div>
                  <div className="nav-txt">Shared</div>
                </div>
              </Link>
              {/* <a href="#Benefits" data-anim="link" className="header__nav-link w-inline-block">
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">Benefits</div>
                  <div className="nav-txt">Benefits</div>
                </div>
              </a>
              <a href="#About" data-anim="link" className="header__nav-link w-inline-block">
                <div className="nav-txt-anim">
                  <div className="nav-txt mod--over">About</div>
                  <div className="nav-txt">About</div>
                </div>
              </a> */}
            </div>
            <div className="header__col">
              {acnt}

              <div className="header__humburger-wrap">
                <div className="header__humb">
                  <div className="header__humb-line mod--1"></div>
                  <div className="header__humb-line mod--2"></div>
                  <div className="header__humb-line mod--3"></div>
                </div>
                <div className="header__humb-close"></div>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
        <div className="menu header-menu-display-c">
          <div className="menu__content menu-content-opacity-height-c">
            <nav className="menu__nav header-nav-bar-c">
              <a href="#uploadFiles" className="menu__nav-link">
                Upload Files
              </a>
              <a href="#Benefits" className="menu__nav-link">
                Benefits
              </a>
              <a href="#About" className="menu__nav-link">
                About
              </a>
            </nav>
            <a href="#" className="btn btn--reg w-button">
              Connect Wallet
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
