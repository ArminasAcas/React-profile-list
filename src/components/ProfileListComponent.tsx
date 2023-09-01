import Profile from "../components/ProfileComponent"
import Divider from "../components/DividerComponent"
import { profiles } from "../globals/DummyData"
import "../css/ProfileListComponent.css"
import { useState, ChangeEvent } from 'react';

export default function ProfileList() {

    const [sortByAge, setSortByAge] = useState(0);
    const [sortByProffesion, setSortByProfession] = useState(0);
    const [sortByUsername, setSortByUsername] = useState(0);
    const [hideUnemployedUsers, setHideUnemployedUsers] = useState(false);
    const [inputValue, setInputValue] = useState("");

    let sortedProfiles = profiles;
    let activeButton = -1;

    if (inputValue.length > 0) filterByInput(inputValue); 
    if (hideUnemployedUsers) filterUnempoyedUsers();
    sortProfilesByAge();
    sortProfilesByProfession();
    sortProfilesByUsername();

    function handleAgeClick() {
        if (sortByAge < 2)
        {
            setSortByAge(sortByAge + 1);
            setSortByProfession(0);
            setSortByUsername(0);
        } 
        else setSortByAge(0);
     }

     function sortProfilesByAge() {
        if (sortByAge === 1) sortedProfiles = sortedProfiles.sort((a,b) => a.age - b.age);
        else if (sortByAge === 2) sortedProfiles = sortedProfiles.sort((a,b) => b.age - a.age);

        if (sortByAge > 0) activeButton = 2;
      }

     function handleProfessionClick() {
        if (sortByProffesion <2) 
        {
            setSortByAge(0);
            setSortByProfession(sortByProffesion + 1);
            setSortByUsername(0);
        }
        else setSortByProfession(0);

     }

     function sortProfilesByProfession() {
        if (sortByProffesion === 1) sortedProfiles = sortedProfiles.sort((a, b) => b.profession.localeCompare(a.profession));
        else if (sortByProffesion === 2) sortedProfiles = sortedProfiles.sort((a, b) => a.profession.localeCompare(b.profession));

        if (sortByProffesion > 0) activeButton = 1;
     }

     function handleUsernameClick() {
        if (sortByUsername < 2)
        {
            setSortByAge(0);
            setSortByProfession(0);
            setSortByUsername(sortByUsername + 1);
        } 
        else setSortByUsername(0);
     }

     function sortProfilesByUsername() {
        if (sortByUsername === 1) sortedProfiles = sortedProfiles.sort((a,b) => b.username.localeCompare(a.username));
        else if (sortByUsername === 2) sortedProfiles = sortedProfiles.sort((a,b) => a.username.localeCompare(b.username));
        
        if (sortByUsername > 0) activeButton = 0;
     }

     function handleHideClick() {
        setHideUnemployedUsers(!hideUnemployedUsers);
     }

     function filterUnempoyedUsers() {
        sortedProfiles = sortedProfiles.filter( profile => {
            return profile.profession !== "Unemployed";
        })
     }

     function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
     };

     function filterByInput(input: string) {
        sortedProfiles = profiles.filter( profile => {
            return profile.username.includes(input);
        })
     }

     let profileList =  sortedProfiles.map(profile => 
        <Profile key={profile.id} profileImageUrl={profile.imageUrl}  username={profile.username} profession={profile.profession}  age={profile.age} />
    )
    
    return (
        <>
            <div className="profile-list">
                <div className="profile-list__text">
                    <input className="profile-list__search" type="text" placeholder="enter username" onChange={handleInputChange}></input>
                    <input className="profile-list__checkbox" type="checkbox" onClick={handleHideClick}></input>
                    <label> Hide unemployed users</label>
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