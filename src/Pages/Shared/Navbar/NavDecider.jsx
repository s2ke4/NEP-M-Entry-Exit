import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import InstructorNav from './InstructorNav';
import Navbar from './Navbar';
import StudentNav from './StudentNav';

const NavDecider = (props) => {
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [navType, setNavType] = useState(3);
    useEffect(() => {
        axios.get(`${behost}auth/status`).then((res) => {
            if(res.data.user !== null) {
                if(res.data.user.role==="admin"){
                    setNavType(0);
                    console.log(navType);
                 }else if(res.data.user.role==="instructor"){
                    setNavType(1);
                 } else {
                    setNavType(2); 
                 }
            } else{
                setNavType(3);
            }
          })
    });
    return (
        <div>
            {(navType === 0) ?
                <AdminNav>{props.children}</AdminNav>
                :
                (navType === 1) ?
                <InstructorNav>{props.children}</InstructorNav>
                :
                (navType === 2) ?
                <StudentNav>{props.children}</StudentNav>
                :
                <Navbar>{props.children}</Navbar>
            }
        </div>
    )
}

export default NavDecider
