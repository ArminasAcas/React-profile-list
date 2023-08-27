import Profile from "../components/ProfileComponent"
import { profiles } from "../globals/global"
import "../css/ProfileListComponent.css"

export default function ProfileList() {

    let profileList =  profiles.map(profile => 
        <Profile profileImageUrl={profile.imageUrl}  username={profile.username} profession={profile.profession}  age={profile.age} />
    ) 
    
    return (
        <>
            <div className="profile-list">
                <div className="profile-list__text">
                    <span className="profile-list__text--60">User</span>
                    <span className="profile-list__text--30">Profession</span>
                    <span className="profile-list__text--10">Age</span>
                </div>
            {profileList}
            </div>
        </>
    )
}