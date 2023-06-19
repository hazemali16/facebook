import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const [uId, setUId] = useState(0);
    useEffect(() => {
        if (window.sessionStorage.getItem("currentI")) {
            let crr = window.sessionStorage.getItem("currentI")
            document.querySelectorAll(".mobile-nav .i").forEach((i) => {i.classList.remove("active")})
            document.querySelectorAll(".mobile-nav .i")[+crr].classList.add("active")
        }
        if (window.localStorage.getItem("color") === "dark") {
            document.documentElement.style.setProperty("--main-color", "#18191a");
            document.documentElement.style.setProperty("--sec-color", "#242526");
            document.documentElement.style.setProperty("--input-color", "#3a3b3c");
            document.documentElement.style.setProperty(
                "--main-box-shadow",
                "1px 1px 5px #333"
            );
            document.documentElement.style.setProperty("--text-color", "#ffffff");
            document.querySelector(".home").style.color = "white";
            document.querySelector(".nav .h3").style.color = "white";
            document.querySelector(".nav").style.cssText =
                "box-shadow: 1px 1px 5px #555;";
            document.querySelector(".nav .icons .image .drop-menu").style.cssText =
                "box-shadow: 0px 5px 5px #333;";
        } else {
            document.documentElement.style.setProperty("--main-color", "#f0f2f5");
            document.documentElement.style.setProperty("--sec-color", "#fff");
            document.documentElement.style.setProperty("--input-color", "#f0f2f5");
            document.documentElement.style.setProperty(
                "--main-box-shadow",
                "1px 1px 5px #ddd"
            );
            document.documentElement.style.setProperty("--text-color", "#000");
            document.querySelector(".home").style.color = "black";
            document.querySelector(".nav .h3").style.color = "#1877f2";
            document.querySelector(".nav").style.cssText =
                "box-shadow: 1px 1px 5px #ccc;";
            document.querySelector(".nav .icons .image .drop-menu").style.cssText =
                "box-shadow: 0px 5px 5px #ddd;";
        }
        let email = window.localStorage.getItem("email");
        if (email !== "") {
            fetch("https://hazem.pythonanywhere.com/get-data-from-db", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
                .then((res) => res.json())
                .then((data) => {
                    document.querySelector(
                        ".nav .icons .image .drop-menu .user .user-image .name"
                    ).innerHTML = data.userName;
                    setUId(data.id);
                    document.querySelector(".nav .icons .image img").src = data.userImage;
                    document.querySelector(".nav .icons .image .drop-menu .user .user-image img").src = data.userImage;
                })
                .catch((err) => console.log(err));
        }
        document.querySelectorAll(".mobile-nav .i").forEach((i) => {
            i.addEventListener("click", (ele) => {
                document.querySelectorAll(".mobile-nav .i").forEach((i) => {i.classList.remove("active")})
                ele.currentTarget.classList.add("active")
                window.sessionStorage.setItem("currentI", ele.currentTarget.id[1])
            })
        })
    }, []);
    const [clicked, setClicked] = useState(0);

    document.body.onclick = function () {
        if (clicked === 1) {
            document
                .querySelector(".nav .icons .image .drop-menu")
                .classList.remove("active");
            setClicked(0)
        }
    };
    function logOut() {
        window.localStorage.setItem("logged", "not logged");
        window.localStorage.setItem("email", "");
        window.sessionStorage.removeItem("currentI")
        window.location.pathname = "/";
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    function dark() {
        if (window.localStorage.getItem("color") !== "dark") {
            document.documentElement.style.setProperty("--main-color", "#18191a");
            document.documentElement.style.setProperty("--sec-color", "#242526");
            document.documentElement.style.setProperty("--input-color", "#3a3b3c");
            document.documentElement.style.setProperty(
                "--main-box-shadow",
                "1px 1px 5px #333"
            );
            document.documentElement.style.setProperty("--text-color", "#ffffff");
            document.querySelector(".home").style.color = "white";
            document.querySelector(".nav .h3").style.color = "white";
            document.querySelector(".nav").style.cssText =
                "box-shadow: 1px 1px 5px #555;";
            document.querySelector(".nav .icons .image .drop-menu").style.cssText =
                "box-shadow: 0px 5px 5px #333;";
            window.localStorage.setItem("color", "dark");
        } else {
            document.documentElement.style.setProperty("--main-color", "#f0f2f5");
            document.documentElement.style.setProperty("--sec-color", "#fff");
            document.documentElement.style.setProperty("--input-color", "#f0f2f5");
            document.documentElement.style.setProperty(
                "--main-box-shadow",
                "1px 1px 5px #ddd"
            );
            document.documentElement.style.setProperty("--text-color", "#000");
            document.querySelector(".home").style.color = "black";
            document.querySelector(".nav .h3").style.color = "#1877f2";
            document.querySelector(".nav").style.cssText =
                "box-shadow: 1px 1px 5px #ccc;";
            document.querySelector(".nav .icons .image .drop-menu").style.cssText =
                "box-shadow: 0px 5px 5px #ddd;";
            window.localStorage.setItem("color", "white");
        }
    }
    return (
        <>
            <div className="nav">
                <div className="icons">
                    <div className="image">
                        <img
                            src=""
                            alt=""
                            onClick={() => {
                                setClicked(0)
                                document
                                    .querySelector(".nav .icons .image .drop-menu")
                                    .classList.toggle("active");
                                setTimeout(() => {
                                    setClicked(1)
                                }, 100);
                            }}
                        />
                        <i
                            class="fa-solid fa-chevron-down"
                            onClick={() => {
                                setClicked(0)
                                document
                                    .querySelector(".nav .icons .image .drop-menu")
                                    .classList.toggle("active");
                                setTimeout(() => {
                                    setClicked(1)
                                }, 100);
                            }}
                        ></i>
                        <div className="drop-menu">
                            <div className="user">
                                <div className="user-image">
                                    <span className="name"></span>
                                    <img src="" alt="" />
                                </div>
                                <Link
                                    className="show"
                                    to={"/profile"}
                                    onClick={() => {
                                        window.localStorage.setItem("uId", uId);
                                        window.sessionStorage.removeItem("currentI")
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1000);
                                    }}
                                >
                                    عرض الملف الشخصي
                                </Link>
                            </div>
                            <ul>
                                <li onClick={dark}>
                                    تمكين الوضع المظلم
                                    <i class="fa-solid fa-moon"></i>
                                </li>
                                <li onClick={logOut}>
                                    تسجيل الخروج
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Link to={'/'} className="h3">facebook</Link>
            </div>
            <div className="mobile-nav">
                <Link class="fa-solid fa-user-group i" to={'/friends'} id="i0"></Link>
                <Link class="fa-solid fa-display i" to={'/watch'} id="i1"></Link>
                <Link class="fa-solid fa-house i active" to={'/'} id="i2"></Link>
            </div>
        </>
    );
}

export default NavBar;
