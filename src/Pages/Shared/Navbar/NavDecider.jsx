import { useState, useEffect,useContext } from 'react';
import {UserContext} from '../../../Providers/UserProvider'
import axios from 'axios';
import AdminNav from './AdminNav';
import InstructorNav from './InstructorNav';
import Navbar from './Navbar';
import StudentNav from './StudentNav';

const NavDecider = (props) => {
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const {info} = useContext(UserContext);
    console.log(info);
    const [navType, setNavType] = useState(3);
    useEffect(() => {
        axios.get(`${behost}auth/status`).then((res) => {
            if(res.data.user) {
                if(res.data.user.role==="admin"){
                    setNavType(0);
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
            { (navType) === 0  ? <AdminNav>{props.children}</AdminNav> : null }
            { (navType) === 1  ? <InstructorNav>{props.children}</InstructorNav> : null}
            { (navType) === 2  ? <StudentNav>{props.children}</StudentNav> : null}
            { (navType) === 3  ? <Navbar>{props.children}</Navbar> : null}
        </div>
    )
}

export default NavDecider
