import { useEffect, useState } from "react";
import PostBox from "./PostBox";


function Watch() {
    let [posts, setPosts] = useState([]);
    let [logData, SetLogData] = useState("")
    useEffect(() => {
        let email = window.localStorage.getItem("email");
        fetch("https://hazem.pythonanywhere.com/get-data-from-db", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                SetLogData(data)
            })
            setTimeout(() => {
                fetch("https://hazem.pythonanywhere.com/get-posts-data-from-db", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ uId: true }),
                })
                .then((res) => res.json())
                .then((data) => {
                    setPosts(data);
                })
                .catch(err => console.log(err))
            }, 2000);
    }, []);
    posts = posts.map((post) => {
        return (
            <PostBox
                key={post.id}
                postId={post.id}
                userId={post.userId}
                userName={post.userName}
                userImage={post.userImage}
                title={post.title}
                mediaUrl={post.mediaUrl}
                dataCreated={post.dataCreated}
                likes={post.likes}
                likeUserIds={post.likeUserIds}
                comments={post.comments}
                commentUserIds={post.commentUserIds}
                userNamesInComments={post.userNamesInComments}
                usersImages={post.usersImages}
                logData={logData}
            />
        );
    });
    return(
        <div className="watch">
            <h2>Watch</h2>
            <div className="center">
            {posts}
            </div>
        </div>
    )
}

export default Watch