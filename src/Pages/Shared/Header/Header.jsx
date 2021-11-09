import { React, useState, useEffect,useContext } from "react";
import {UserContext} from '../../../Providers/UserProvider'
import { Divider } from "semantic-ui-react";
import "./Header.css";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import dotenv from 'dotenv';
import { useHistory } from "react-router"
dotenv.config({ path: "/" })

const Header = () => {
  const history = useHistory();
  const {info,fetchInfo} = useContext(UserContext);
  const logo = "/assets/images/HeaderNFooter/logo.png";
  const behost = process.env.REACT_APP_BACKEND_HOST
  const [redirect, setRedirect] = useState()
  const [loggedIn, setLoggedIn] = useState(false);

  const redirectUser = (role) => {
    if (role === "admin") {
      setRedirect("/admin/dashboard");
    } else if (role === "instructor") {
      setRedirect("/instructor/dashboard");
    } else if (role === "student") {
      setRedirect("/student/dashboard");
    } else {
      setRedirect("/student/dashboard");
    }
  }

  const responseSuccessGoogle = async (response) => {
    const res = await axios({
      method: "POST",
      url: behost + "auth/login",
      data: { tokenId: response.tokenId },
      withCredentials: true
    })
    setLoggedIn(true);
    fetchInfo();
    if (res.data.registered) {
      redirectUser(res.data.user.role);
    } else {
      setRedirect("/student/sign-up");
    }
  }

  const responseErrorGoogle = (response) => {
    console.log("OOPS Error while google authentication ", response)
  }

  const logout = async()=>{
      await axios.get(`${behost}auth/logout`);
      setLoggedIn(false);
      fetchInfo();
      setRedirect("/")
  }

  useEffect(() => {
    if (info.user) {
      setLoggedIn(true);
    }
  }, [info])

  if (redirect) {
    history.push(redirect);
  }

  return (
    <div className="header-of-nep">
      <div className="left-flex">
        <div className="brand">
          <div className="brand-name">NEP 2020 Multiple Entry Exit Management Portal</div>
        </div>
      </div>

      <div className="right-flex">
        <div className="brand-logo">
          {!loggedIn ? <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login With Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          /> : <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
          >
          </GoogleLogout>}
        </div>
      </div>
    </div>
  );
};

export default Header;