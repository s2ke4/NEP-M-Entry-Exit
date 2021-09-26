import { useState, useEffect,useContext } from 'react';
import {UserContext} from '../../../Providers/UserProvider'
import AdminNav from './AdminNav';
import InstructorNav from './InstructorNav';
import Navbar from './Navbar';
import StudentNav from './StudentNav';

const NavDecider = (props) => {
    const {info} = useContext(UserContext);
    const [navType, setNavType] = useState(3);
    useEffect(() => {
        if(info.user) {
            if(info.user.role==="admin"){
                setNavType(0);
            }else if(info.user.role==="instructor"){
                setNavType(1);
            } else {
                setNavType(2); 
            }
        } else{
            setNavType(3);
        }
    },[info]);
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
