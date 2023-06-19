import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Friends() {
    let [friends, setFriends] = useState([]) 
    useEffect(() => {
        let email = window.localStorage.getItem("email");
        fetch("https://hazem.pythonanywhere.com/get-users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
        .then(res => res.json())
        .then(data => setFriends(data))
    }, [])
    friends = friends.map((friend) => {
        return(
            <Link className="friend" to={'/profile'} key={friend.id} onClick={() => {
                window.localStorage.setItem("uId", friend.id)
            }}>
                <span className="name">{friend.userName}</span>
                <img src={friend.userImage} alt=""/>
            </Link>
        )
    })
    return(
        <div className="friends">
            <h2>الاصدقاء</h2>
            {friends}
        </div>
    )
}

export default Friends