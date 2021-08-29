import React from "react";
import { Divider } from "semantic-ui-react";
import "./Header.css";

const Header = () => {
  const logo = "/assets/images/HeaderNFooter/logo.png";
  const socialIcons = [
    "/assets/images/HeaderNFooter/facebook.png",
    "/assets/images/HeaderNFooter/twitter.png",
    "/assets/images/HeaderNFooter/linkedin.png",
    "/assets/images/HeaderNFooter/youtube.png",
    "/assets/images/HeaderNFooter/instagram.png",
  ];
  return (
    <div className="header">
      <div className="left-flex">
        <div className="brand-logo">
          <a href="/">
            <img src={logo} alt={"logo"} className="brand-img" />
          </a>
        </div>
        <div className="brand">
          <div className="brand-name">NEP 2020 Multiple Entry Exit Management Portal</div>
          <Divider fitted={true} className="brand-divider" />
          <div className="brand-name">IIIT Vadodara</div>
        </div>
      </div>

      <div className="right-flex">
        <div className="social">
          <a href="/">
            <img src={socialIcons[0]} alt="facebook" className="social-icon" />
          </a>
          <a href="/">
            <img src={socialIcons[1]} alt="twitter" className="social-icon" />
          </a>
          <a href="/">
            <img src={socialIcons[2]} alt="linkedin" className="social-icon" />
          </a>
          <a href="/">
            <img src={socialIcons[3]} alt="youtube" className="social-icon" />
          </a>
          <a href="/">
            <img src={socialIcons[4]} alt="instagram" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;