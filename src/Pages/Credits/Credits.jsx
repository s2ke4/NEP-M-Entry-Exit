import React from 'react'
import TeamCard from './TeamCard/TeamCard';
import './Credits.css'

const Credits = () => {
    const devTeam = [
        {
            name: "Keshav Agarwal",
            role: "Student at IIIT Vadodara",
            linkedin: "https://in.linkedin.com/in/keshavagarwal1710",
            instagram: "https://in.linkedin.com/in/keshavagarwal1710",
        },
        {
            name: "Darshan Hande",
            role: "Student at IIIT Vadodara",
            linkedin: "https://www.linkedin.com/in/darshan-hande-6a7479128/",
            instagram: "https://www.instagram.com/darshanhande11/",
        },
        {
            name: "Ayush Patel",
            role: "Student at IIIT Vadodara",
            linkedin: "https://in.linkedin.com/in/inayushpatel",
            instagram: "https://www.instagram.com/in.ayushpatel/",
        },
        {
            name: "Abhay Dwivedi",
            role: "Student at IIIT Vadodara",
            linkedin: "https://in.linkedin.com/in/abhay-dwivedi-07",
            instagram: "https://www.instagram.com/_abhaydwivedi/",
        }
    ];
    const mentor = [
        {
            name: "Dr. Novarun Deb",
            role: "Assistant Professor at IIIT Vadodara",
            linkedin: "https://in.linkedin.com/in/novarun-deb-52752654",
        }
    ];
    return (
        <div className="about-us-team-div">
            <div className='credits-header'>
                Credits :
            </div>
            <div className="about-us-mentor-div">
                <div className="about-us-team-header">
                    Mentor
                </div>
                <div className="about-us-team-cards-div">
                    {
                        mentor.map((member,index) => (
                            <div key={index}>
                                <TeamCard name={member.name} role={member.role} linkedin={member.linkedin} instagram={member.instagram} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='about-us-dev-team-div'>
                <div className="about-us-team-header">
                    Dev Team
                </div>
                <div className="about-us-team-cards-div">
                    {
                        devTeam.map((member,index) => (
                            <div key={index}>
                                <TeamCard name={member.name} role={member.role} linkedin={member.linkedin} instagram={member.instagram} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Credits
