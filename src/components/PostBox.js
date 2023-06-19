import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostBox(props) {
    const [imgVid, setImgVid] = useState("")
    const [likes, setLikes] = useState(props.likes)
    const [numComment, setNumComment] = useState(0)
    if (props.comments !== "") {
        setNumComment(props.comments.split(",[z3ama],").slice(1,).length)
    }
    const[comment, setComment] = useState("")
    useEffect(() => {
        if (props.mediaUrl !== "") {
            if (props.mediaUrl.slice(0, 15).indexOf("image") !== -1) {
                setImgVid(<img src={props.mediaUrl} alt="" />)
            } else if (props.mediaUrl.slice(0, 15).indexOf("video") !== -1) {
                setImgVid(<video src={props.mediaUrl} controls />)
            }
        } else {
            setImgVid("")
        }
        if (props.logData !== "") {
            let count = 0
            let ifLike =  props.likeUserIds.split(",").filter(ele => ele !== "")
            ifLike.forEach(ele => {
                if (ele === props.logData.id.toString()) {
                    count += 1
                    if (count % 2 !== 0) {
                        document.querySelector(`#p${props.postId} .like`).classList.add("active-like")
                        document.querySelectorAll(`#p${props.postId} .like`)[1].classList.add("active-like")
                    } else {
                        document.querySelector(`#p${props.postId} .like`).classList.remove("active-like")
                        document.querySelectorAll(`#p${props.postId} .like`)[1].classList.remove("active-like")
                    }
                }
            })
        }
    }, [props.likeUserIds, props.logData, props.mediaUrl, props.postId])
    function like(ele) {
        ele.classList.toggle("active-like")
        if (ele.classList.contains("active-like") === true) {
            setLikes(likes + 1)
            let likeData = {
                postId: props.postId,
                likes: likes + 1,
                likeUserIds: props.logData.id
            }
            fetch("https://hazem.pythonanywhere.com/post-likes-number", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(likeData),
            });
        }else {
            setLikes(likes - 1)
            let likeData = {
                postId: props.postId,
                likes: likes - 1,
                likeUserIds: props.logData.id
            }
            fetch("https://hazem.pythonanywhere.com/post-likes-number", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(likeData),
            });
        }
        
    }
    let count = 0
    function openPost() {
        document.querySelector(`#p${props.postId} .poster-overly`).style.display = "flex"
        if (props.userNamesInComments !== undefined && count === 0) {
            for (let i = 0; i < props.comments.split(",[z3ama],").slice(1,).length; i++) {
                let commentBox = document.querySelector(`#p${props.postId} .poster-overly .box-comments`)
                let comment = document.createElement('div')
                comment.className = "comment" 
                let text = document.createElement('div')
                text.className = "text"
                let img = document.createElement('img')
                img.src = props.usersImages[i]
                img.onclick = () => {
                    window.localStorage.setItem("uId", props.commentUserIds.split(",").slice(1,)[i])
                    setTimeout(() => {
                        window.location.pathname = "/profile"
                    }, 1000);
                }
                let span = document.createElement("span")
                span.appendChild(document.createTextNode(props.userNamesInComments[i]))
                span.className = "name"
                text.appendChild(span)
                let p = document.createElement("p")
                p.appendChild(document.createTextNode(props.comments.split(",[z3ama],").slice(1,)[i]))
                p.className = "comment-title"
                text.appendChild(p)
                comment.appendChild(text)
                comment.appendChild(img)
                commentBox.appendChild(comment)
            }
            count = 1
        }
    }
    function closePost() {
        document.querySelector(`#p${props.postId} .poster-overly`).style.display = "none"
    }
    function sendComment() {
        let textarea = document.querySelector(`#p${props.postId} .poster-overly textarea`)
        if (textarea.value !== "") {
            let commentBox = document.querySelector(`#p${props.postId} .poster-overly .box-comments`)
            let comment = document.createElement('div')
            comment.className = "comment" 
            let text = document.createElement('div')
            text.className = "text"
            let img = document.createElement('img')
            img.src = props.logData.userImage
            img.onclick = () => {
                window.localStorage.setItem("uId", props.logData.id)
                setTimeout(() => {
                    window.location.pathname = "/profile"
                }, 1000);
            }
            let span = document.createElement("span")
            span.appendChild(document.createTextNode(props.logData.userName))
            span.className = "name"
            text.appendChild(span)
            let p = document.createElement("p")
            p.appendChild(document.createTextNode(textarea.value))
            p.className = "comment-title"
            text.appendChild(p)
            comment.appendChild(text)
            comment.appendChild(img)
            commentBox.appendChild(comment)
            setNumComment(+numComment + 1)
            let commentData = {
                postId: props.postId,
                comment: textarea.value,
                commentUserIds: props.logData.id,
            }
            fetch("https://hazem.pythonanywhere.com/post-comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentData),
            });
            textarea.value = ""
        }
    }
    function uProfile(ele) {
        window.localStorage.setItem("uId", ele.slice(1, ele.length))
    }
    return (
        <div className="poster" id={"p"+props.postId}>
            <div className="poster-user">
                <div className="name-date">
                    <span className="name">{props.userName}</span>
                    <span className="date">{props.dataCreated}</span>
                </div>
                <Link to={'/profile'} className="image">
                <img src={props.userImage} alt="" id={"u"+props.userId} onClick={(ele) => {uProfile(ele.target.id)}}/>
                </Link>
            </div>
            <p className="poster-title">{props.title}</p>
            {imgVid}
            <div className="social">
                <div className="info">
                    {useEffect(() => {
                        if (props.comments !== "")  {
                            setComment(<span>comment {numComment}</span>)
                        }
                    }, [numComment, props.comments])}
                    {comment}
                    {likes !== 0 && <span><i class="fa-solid fa-thumbs-up"></i>{likes}</span>}
                </div>
                <div className="like-comment">
                    <span className="comment" onClick={openPost}>
                        Comment
                        <i class="fa-regular fa-message"></i>
                    </span>
                    <span className="like" onClick={(ele) => {like(ele.target)}}>
                        Like
                        <i class="fa-regular fa-thumbs-up"></i>
                    </span>
                </div>
            </div>
            <div className="poster-overly">
                <div className="poster-box">
                    <div className="poster-box-title">
                    <i class="fa-solid fa-x" onClick={closePost}></i>
                    {props.userName} منشور
                    </div>
                    {imgVid}
                    <div className="social">
                <div className="info">
                {useEffect(() => {
                        numComment !== 0 && setComment(<span>comment {numComment}</span>)
                    }, [numComment])}
                    {comment}
                    {likes !== 0 && <span><i class="fa-solid fa-thumbs-up"></i>{likes}</span>}
                </div>
                <div className="like-comment">
                    <span className="comment">
                        Comment
                        <i class="fa-regular fa-message"></i>
                    </span>
                    <span className="like">
                        Like
                        <i class="fa-regular fa-thumbs-up"></i>
                    </span>
                </div>
            </div>
            <div className="box-comments">
            </div>
            <textarea />
            <i class="fa-solid fa-paper-plane" onClick={sendComment}></i>
                </div>
            </div>
        </div>
    );
}

export default PostBox;
