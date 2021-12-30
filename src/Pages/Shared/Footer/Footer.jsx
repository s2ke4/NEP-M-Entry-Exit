import React from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'semantic-ui-react'
import './Footer.css'

const Footer = () => {
    const disclaimerText =
    "The contents in the website are for information purpose only. IIIT Vadodara regularly monitors and updates the information on this website. We attempt to ensure that the information on this website is correct, however, we do not warrant its completeness or accuracy. No rights can be derived from the information contained in the IIIT Vadodara website. The website may contain links to websites of third party organizations. IIIT Vadodara cannot be held responsible for any consequences arising from the use of information obtained from these websites.";
    return (
        <footer className='footer-tag'>
            {/* <div className="brand-logo-div">
                <img
                src="/asset/images/Home/HeaderNFooter/logo.png"
                alt="iiitv-logo"
                className="brand-logo-img"
                />
            </div> */}
            <Divider />
            <div className="brand-name-div">
                <Link className="brand-name-p" to="/">NEP Institute Management Portal</Link>
            </div>
            <div className='footer-credits-div'>
                <Link to="/credits" className='footer-credits-link'>Credits</Link>
            </div>
            <div className="disclaimer-div">
                <p className="disclaimer">
                Disclaimer <br />
                {disclaimerText}
                </p>
            </div>
        </footer>
    )
}

export default Footer
