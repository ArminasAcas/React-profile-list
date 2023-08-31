import Profile from "../components/ProfileComponent"
import Divider from "../components/DividerComponent"
import { profiles } from "../globals/DummyData"
import "../css/ProfileListComponent.css"
import { useState, ChangeEvent } from 'react';

export default function ProfileList() {

    const [sortByAge, setSortByAge] = useState(0);
    const [sortByProffesion, setSortByProfession] = useState(0);
    const [sortByUsername, setSortByUsername] = useState(0);
    const [activeButton, setActiveButton] = useState(-1);
    const [hideUnemployedUsers, setHideUnemployedUsers] = useState(false);
    const [sortedProfiles, setSortedProfiles] = useState(profiles);
    const [inputValue,setInputValue] = useState("");

    function handleAgeClick() {
        if (inputValue.length > 0) filterByInput(inputValue); 
        if (hideUnemployedUsers) filterUnempoyedUsers();
        if (sortByAge === 0) setSortByAge(1);
        else setSortByAge(0);
        
        let newSortedProfiles;
        if (sortByAge === 1) newSortedProfiles = sortedProfiles.sort((a,b) => a.age - b.age);
        else newSortedProfiles = sortedProfiles.sort((a,b) => b.age - a.age);
        setActiveButton(2);
        setSortedProfiles(newSortedProfiles);
     }

     function handleProfessionClick() {
        if (inputValue.length > 0) filterByInput(inputValue);
        if (hideUnemployedUsers) filterUnempoyedUsers();
        if (sortByProffesion === 0) setSortByProfession(1);
        else setSortByProfession(0);

        let newSortedProfiles;
        if (sortByProffesion === 1) newSortedProfiles = sortedProfiles.sort((a, b) => b.profession.localeCompare(a.profession));
        else newSortedProfiles = sortedProfiles.sort((a, b) => a.profession.localeCompare(b.profession));
        setActiveButton(1);
        setSortedProfiles(newSortedProfiles);
     }

     function handleUsernameClick() {
        if (inputValue.length > 0) filterByInput(inputValue); 
        if (hideUnemployedUsers) filterUnempoyedUsers();
        if (sortByUsername === 0) setSortByUsername(1);
        else setSortByUsername(0);

        let newSortedProfiles;
        if (sortByUsername === 1) newSortedProfiles = sortedProfiles.sort((a,b) => b.username.localeCompare(a.username));
        else newSortedProfiles = sortedProfiles.sort((a,b) => a.username.localeCompare(b.username));
        setActiveButton(0);
        setSortedProfiles(newSortedProfiles);
     }

     function handleHideClick() {
        if (!hideUnemployedUsers === true) {
            filterUnempoyedUsers();
        } else {
            setSortedProfiles(profiles);
        }
        setHideUnemployedUsers(!hideUnemployedUsers);
     }

     function filterUnempoyedUsers() {
        let newSortedPrifles = sortedProfiles.filter( profile => {
            return profile.profession !== "Unemployed";
        })
        setSortedProfiles(newSortedPrifles);
     }

     function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
        filterByInput(e.target.value);
        if (hideUnemployedUsers) filterUnempoyedUsers();
     };

     function filterByInput(input: string) {
        if(input.length === 0) 
        {
            setSortedProfiles(profiles);
            return;
        }
        let newSortedPrifles = profiles.filter( profile => {
            return profile.username.includes(input);
        })
        setSortedProfiles(newSortedPrifles);
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