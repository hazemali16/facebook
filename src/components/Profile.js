import { useEffect, useState } from "react";
import PostBox from "./PostBox";

function Profile() {
    const [uId, setUId] = useState(0);
    let [posts, setPosts] = useState([]);
    let [logData, SetLogData] = useState("")
    useEffect(() => {
        let email = window.localStorage.getItem("email");
        let id = window.localStorage.getItem("uId");
        fetch("https://hazem.pythonanywhere.com/get-data-from-db", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                document.querySelector(
                    ".container-profile .user .name"
                ).innerHTML = data.userName;
                document.querySelector(
                    ".container-profile .overly .post-box textarea"
                ).placeholder = "؟ " + data.userName + " بم تفكر يا";
                document.querySelector(".container-profile .input").innerHTML =
                    "؟ " + data.userName + " بم تفكر يا";
                    document.querySelector(".container-profile .center .you .image img").src = data.userImage;
                    document.querySelector(".container-profile .user img").src = data.userImage;
                    setUId(id);
                SetLogData(data)
            })
            .catch(err => console.log(err))
            if (uId !== 0) {
                    fetch("https://hazem.pythonanywhere.com/get-posts-data-from-db", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ uId }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data[0] !== undefined) {
                                document.querySelector(".container-profile .profile .name").innerHTML = data[0].userName;
                                document.querySelector(".container-profile .profile img").src = data[0].userImage 
                                setPosts(data);
                            }
                            else {
                                document.querySelector(".container-profile .profile .name").innerHTML = data.userName;
                                document.querySelector(".container-profile .profile img").src = data.userImage 
                            }
                        })
                        .catch(err => console.log(err))
            }
}, [uId]);
    function openPost() {
        document.querySelector(".container-profile .overly").style.display = "flex";
        document.querySelector(".container-profile .post-box .idea").focus();
    }
    function closePost() {
        document.querySelector(".container-profile .overly").style.display = "none";
    }
    function getImage() {
        document
            .querySelector(".container-profile .overly .post-box .box-image input")
            .click();

        const fileInput = document.querySelector(
            ".container-profile .overly .post-box .box-image input"
        );

        const imagePreview = document.querySelector(
            ".container-profile .overly .post-box .box-image img"
        );

        fileInput.addEventListener("change", function () {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                if (file.type.indexOf("image") !== -1) {
                    imagePreview.style.display = "block";
                    imagePreview.src = reader.result;
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image span"
                    ).style.display = "none";
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image i"
                    ).style.display = "none";
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image video"
                    ).style.display = "none";
                }
                if (file.type.indexOf("video") !== -1) {
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image video"
                    ).src = reader.result;
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image video"
                    ).style.width = "100%";
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image video"
                    ).style.height = "100%";
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image video"
                    ).style.display = "block";
                    imagePreview.style.display = "none";
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image span"
                    ).style.display = "none";
                    document.querySelector(
                        ".container-profile .overly .post-box .box-image i"
                    ).style.display = "none";
                }
            });
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }
    function dataPost() {
        let text = document.querySelector(".container-profile .overly .post-box .idea");
        const fileInput = document.querySelector(
            ".container-profile .overly .post-box .box-image input"
        );
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            if (reader.result !== "" && (file.type.indexOf("image") !== -1 || file.type.indexOf("video") !== -1)) {
                let postData = {
                    userId: uId,
                    title: text.value,
                    mediaUrl: reader.result,
                    type: file.type.slice(0,5),
                    comments: "",
                    commentUserIds: "",
                    likeUserIds: "",
                };
                fetch("https://hazem.pythonanywhere.com/post-data-to-db", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(postData),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "done") {
                        window.location.pathname = "/"
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000);
                    }
                })
            }
        });
        if (file) {
            reader.readAsDataURL(file);
        }
        if (text.value !== "" && fileInput.value === "") {
            let postData = {
                userId: uId,
                title: text.value,
                mediaUrl: "",
                type: "text",
                comments: "",
                commentUserIds: "",
                likeUserIds: "",
            };
            fetch("https://hazem.pythonanywhere.com/post-data-to-db", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "done") {
                    window.location.pathname = "/"
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }
            })
        }
    }
    posts = posts.map((post) => {
        return (
            <PostBox
                key={post.id}
                postId={post.id}
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
    function changeImage() {
        let id = window.localStorage.getItem("uId");
        if (id === logData.id.toString()) {
            document.querySelector(".container-profile .profile .overly").style.display = "flex"
        }
    }
    function close() {
        document.querySelector(".container-profile .profile .overly").style.display = "none"
    }
    function getUserImage() {
        document
            .querySelector(".container-profile .profile .overly .image-box input")
            .click();

        const fileInput = document.querySelector(
            ".container-profile .profile .overly .image-box input"
        );

        const imagePreview = document.querySelector(
            ".container-profile .profile .overly .image-box img"
        );

        fileInput.addEventListener("change", function () {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                if (file.type.indexOf("image") !== -1) {
                    imagePreview.style.display = "block";
                    imagePreview.src = reader.result;
                    document.querySelector(
                        ".container-profile .profile .overly .image-box span"
                    ).style.display = "none";
                    document.querySelector(
                        ".container-profile .profile .overly .image-box i"
                    ).style.display = "none";
                }
            });
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }
    function updateImage() {
        const imagePreview = document.querySelector(
            ".container-profile .profile .overly .image-box img"
        );
        fetch("https://hazem.pythonanywhere.com/update-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({image: imagePreview.src, id: logData.id}),
        })
        .then(res => res.json())
        .then(data => {
            if (data.update === "done") {
                window.location.pathname = "/"
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        })
    }
    
    return(
        <div className="container-profile">
            <div className="overly">
                <div className="post-box">
                    <div className="title">
                        <h3>انشاء منشور</h3>
                        <i class="fa-solid fa-x" onClick={closePost}></i>
                    </div>
                    <div className="user">
                        <span className="name"></span>
                        <img src="" alt="" />
                    </div>
                    <textarea placeholder={"؟" + +"بم تفكر يا"} className="idea" />
                    <div className="box-image" onClick={getImage}>
                        <img alt="" src="" />
                        <video src="" controls />
                        <input type="file" className="file" />
                        <i class="fa-regular fa-images"></i>
                        <span>اضافة صورة / مقطع فيديو</span>
                    </div>
                    <span className="post-post" onClick={dataPost}>
                        نشر
                    </span>
                </div>
            </div>
            <div className="profile">
                <span className="name"></span>
                <div className="image" onClick={changeImage}>
                <i class="fa-solid fa-camera"></i>
                <img src="" alt="" />
                </div>
                <div className="overly">
                    <div className="box">
                    <div className="image-box" onClick={getUserImage}>
                    <img alt="" src="" />
                    <input type="file" className="file" />
                    <i class="fa-regular fa-images"></i>
                    <span>اضافة صورة</span>
                    </div>
                    <div className="btns">
                        <span className="update" onClick={updateImage}>تحديث</span>
                        <span className="close" onClick={close}>الغاء</span>
                    </div>
                    </div>
                </div>
            </div>
            <div className="center">
            <div className="you">
                    <div className="image">
                        <div className="input" onClick={openPost}></div>
                        <img src="" alt="" />
                    </div>
                    <div className="post">
                        <div className="text">
                            <span onClick={openPost}>صورة / فيديو</span>
                            <i class="fa-regular fa-images" onClick={openPost}></i>
                        </div>
                    </div>
                </div>
                {posts}
            </div>
        </div>
    )
}

export default Profile