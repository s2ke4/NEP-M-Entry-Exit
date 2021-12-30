import { UserContext } from "../../Providers/UserProvider";
import { Redirect,useParams } from "react-router-dom";
import LoadingData from "../Shared/Loading/Loading";
import { useEffect,useState, useContext } from "react";
const Course = () =>{
    const {info} = useContext(UserContext);
    const [url,setRedirect] = useState()
    const {courseId} = useParams();
    useEffect(()=>{
        if(!info.isLoading){
            let role = "student";
            if(info.user){
                role = info.user.role;
            }
            setRedirect("/" + role + "/courses/" + courseId);
        }
    },[info])
    return(
        <>
            {url?<Redirect to={url} />:<LoadingData />}
        </>
    );
}

export default Course;