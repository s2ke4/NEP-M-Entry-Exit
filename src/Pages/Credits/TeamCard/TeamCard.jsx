import React from 'react'
import './TeamCard.css'
import { Link } from 'react-router-dom';

const TeamCard = (props) => {
    let imgName;
    if (props.name === "Keshav Agarwal") {
        imgName = "keshav.jpeg"
    } else if (props.name === "Darshan Hande") {
        imgName = "darshan.jpeg"
    } else if (props.name === "Ayush Patel") {
        imgName = "ayush.jpeg"
    } else if (props.name === "Dr. Novarun Deb") {
        imgName = "novarun.jpg"
    } else {
        imgName = "abhay.jpeg"
    }
    let instagram = props.instagram;
    let linkedin = props.linkedin;
    return (
        <div className="team-card-div">
            <img src={`/assets/images/Credits/${imgName}`} className="team-card-img" alt={imgName} />
            <div className="team-card-name">{props.name}</div>
            <div className="team-card-role">{props.role}</div>
            <div className="team-card-social-div">
                {
                    (props.name !== "Keshav Agarwal" && props.name !== "Dr. Novarun Deb") &&
                    <div className="team-card-social-icon">
                        <Link to='/about-us' onClick={()=>{window.open(instagram,'_blank')}}><img src={`/assets/images/Credits/instagram.png`} alt="instagram.png" /></Link>
                    </div>
                }
                <div className="team-card-social-icon">
                    <Link to='/about-us' onClick={()=>{window.open(linkedin,'_blank')}}><img src={`/assets/images/Credits/linkedin.png`} alt="linkedin.png" /></Link>
                </div>
            </div>
        </div>
    )
}

export default TeamCard
