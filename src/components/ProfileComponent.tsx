import "../css/ProfileComponent.css";

interface ProfileData{
    profileImageUrl: string;
    username: string;
    age: number;
    profession: string;
}

export default function Profile(props: ProfileData) {

    return (
        <div className="profile">
            <div className="profile__section">
                <img src={props.profileImageUrl} className="profile__image"></img>
                <span className="profile__information">{props.username}</span>
            </div>

            <span className="profile__information">{props.profession}</span>
            <span className="profile__information">{props.age}</span>
        </div>
    );
}