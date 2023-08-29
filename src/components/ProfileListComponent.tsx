import Profile from "../components/ProfileComponent"
import Divider from "../components/DividerComponent"
import { profiles } from "../globals/DummyData"
import "../css/ProfileListComponent.css"
import { useState } from 'react';

export default function ProfileList() {

    const [sortByAge, setSortByAge] = useState(0);
    const [sortByProffesion, setSortByProfession] = useState(0);
    const [sortByUsername, setSortByUsername] = useState(0);
    const [activeButton, setActiveButton] = useState(-1);

    let sortedProfiles = profiles;

    function handleAgeClick() {
        if (sortByAge === 0) setSortByAge(1);
        else setSortByAge(0);
        
        if (sortByAge === 1) sortedProfiles.sort((a,b) => a.age - b.age);
        else sortedProfiles.sort((a,b) => b.age - a.age);
        setActiveButton(2);
     }

     function handleProfessionClick() {
        if (sortByProffesion === 0) setSortByProfession(1);
        else setSortByProfession(0);

        if (sortByProffesion === 1) sortedProfiles.sort((a, b) => b.profession.localeCompare(a.profession));
        else sortedProfiles.sort((a, b) => a.profession.localeCompare(b.profession));
        setActiveButton(1);
     }

     function handleUsernameClick() {
        if (sortByUsername === 0) setSortByUsername(1);
        else setSortByUsername(0);

        if (sortByUsername === 1) sortedProfiles.sort((a,b) => b.username.localeCompare(a.username));
        else sortedProfiles.sort((a,b) => a.username.localeCompare(b.username));
        setActiveButton(0);
     }


     let profileList =  sortedProfiles.map(profile => 
        <Profile key={profile.id} profileImageUrl={profile.imageUrl}  username={profile.username} profession={profile.profession}  age={profile.age} />
    ) 
    
    return (
        <>
            <div className="profile-list">
                <div className="profile-list__text">
                    <button className={`profile-list__text--60 profile-list__button ${activeButton === 0 ? 'profile-list__button--active' : ''} `} onClick={handleUsernameClick}>User</button>
                    <button className={`profile-list__text--30 profile-list__button ${activeButton === 1 ? 'profile-list__button--active' : ''} `} onClick={handleProfessionClick}>Profession</button>
                    <button className={`profile-list__text--10 profile-list__button ${activeButton === 2 ? 'profile-list__button--active' : ''} `} onClick={handleAgeClick}>Age</button>
                </div>
            <Divider />
            {profileList}
            </div>
        </>
    )
}