import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import Home from "./Home";


function MainPage() {
    const [signed, setSigned] = useState(0);
    const [logData, setLogData] = useState({})
    const [logged, setLogged] = useState(0)
    let codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let cCode = "";
    for (let i = 0; i < 6; i++) {
        cCode += codeArr[Math.floor(Math.random() * codeArr.length)];
    }
    const [code, setCode] = useState(cCode);
    function sign() {
        if (document.querySelector('.main-page .form > p')) {
            document.querySelector('.main-page .form > p').remove()
        }
        let fName = document.querySelector(".f-name");
        let lName = document.querySelector(".l-name");
        let email = document.querySelector(".email");
        let password = document.querySelector(".password");
        let fNameCheck = true;
        let lNameCheck = true;
        let emailCheck = true;
        let passwordCheck = true;
        function ifNumHere(string) {
            let nstr = "";
            string.split("").forEach((ele) => {
                if (!isNaN(parseInt(ele))) {
                    nstr = "num";
                }
            });
            return nstr;
        }
        let fnstr = ifNumHere(fName.value);
        let lnstr = ifNumHere(lName.value);
        if (
            fName.value === "" ||
            fName.value[0] === " " ||
            fName.value[fName.value.length - 1] === " " ||
            fnstr === "num"
        ) {
            fName.style.border = "1px solid red";
            fNameCheck = false;
        }
        if (
            lName.value === "" ||
            lName.value[0] === " " ||
            lName.value[lName.value.length - 1] === " " ||
            lnstr === "num"
        ) {
            lName.style.border = "1px solid red";
            lNameCheck = false;
        }
        if (email.value === "") {
            email.style.border = "1px solid red";
            emailCheck = false;
        } else {
            let matched = email.value.match(/\w+@gmail.com/);
            if (matched === null) {
                email.style.border = "1px solid red";
                emailCheck = false;
            }
        }
        if (
            password.value === "" ||
            password.value.length < 6 ||
            password.value.length > 10
        ) {
            password.style.border = "1px solid red";
            passwordCheck = false;
        }
        if (
            fNameCheck === true &&
            lNameCheck === true &&
            emailCheck === true &&
            passwordCheck === true
        ) {
            fetch("https://hazem.pythonanywhere.com/submit-data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, email: email.value }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.email === false) {
                    setSigned(1);
                    setTimeout(() => {
                        document.querySelector(".main-page").remove();
                    }, 100);
                } else {
                    let msg = document.createElement('p')
                    msg.appendChild(document.createTextNode("This email is already exist try to log in"))
                    msg.style.color = "red"
                    document.querySelectorAll('.main-page .form')[1].appendChild(msg)
                }
            })
        }
    }
    function logIn() {
        let email = document.querySelector(".email-log");
        let password = document.querySelector(".password-log");
        if (email.value === "") {
            email.style.border = "1px solid red";
        }
        if (password.value === "") {
            password.style.border = "1px solid red";
        }
        if (email.value !== "" && password.value !== "") {
            fetch("https://hazem.pythonanywhere.com/get-data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.value, password: password.value }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.email === true && data.password === true) {
                    window.localStorage.setItem("logged", "logged")
                    window.localStorage.setItem("email", email.value)
                    setLogData(data)
                    setTimeout(() => {
                        document.querySelector(".main-page").remove();
                    }, 100);
                } else if (data.email === true && data.password === false) {
                    password.style.border = "1px solid red";
                    password.value = ""
                } else {
                    password.style.border = "1px solid red";
                    email.style.border = "1px solid red";
                    setLogData({})
                }
            })
        }
    }
    return (
        <>
        {useEffect(()=> {
            if (window.localStorage.getItem("logged") === "logged") {
                setTimeout(() => {
                if (document.querySelector(".main-page") !== null) {
                    document.querySelector(".main-page").remove();
                }
                }, 1);
                setLogged(<Home />)
            }
        }, [])}
        {logged !== 0 && logged}
            <div className="main-page">
                <div className="facebook-title">
                    <h1 className="title">facebook</h1>
                    <p>Facebook helps you conect and share with people in your life.</p>
                </div>
                <div className="form">
                    <input type="email" placeholder="Email address" className="email-log" />
                    <input type="password" placeholder="Password" className="password-log" />
                    <span className="log-in" onClick={logIn}>Log in</span>
                    <a className="forgot" href="/">
                        Forgotten password?
                    </a>
                    <span
                        className="create"
                        onClick={() =>
                            (document.querySelector(".sign-up").style.display = "flex")
                        }
                    >
                        Create new account
                    </span>
                </div>
                <div className="sign-up">
                    <div className="box">
                        <div className="sign">
                            <h1>Sign Up</h1>
                            <span>It's quick and esay</span>
                            <i
                                class="fa-solid fa-x"
                                onClick={() =>
                                    (document.querySelector(".sign-up").style.display = "none")
                                }
                            ></i>
                        </div>
                        <div className="form">
                            <div className="name">
                                <input
                                    type="text"
                                    placeholder="Frist name"
                                    className="f-name"
                                />
                                <input type="text" placeholder="Surname" className="l-name" />
                            </div>
                            <span className="text">
                                Write name without numbers and without spaces at the beginning
                                and at the end
                            </span>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="email"
                            />
                            <input
                                type="password"
                                placeholder="New password"
                                className="password"
                            />
                            <span className="text">
                                Write the password between 6 and 10 letters
                            </span>
                            <span className="create" onClick={sign}>
                                Sign Up
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {useEffect(() => {
                let fName = document.querySelector(".f-name");
                let lName = document.querySelector(".l-name");
                let email = document.querySelector(".email");
                let password = document.querySelector(".password");
                if (signed === 1) {
                    setSigned(
                        <SignUp
                            fristName={fName.value}
                            lastName={lName.value}
                            email={email.value}
                            password={password.value}
                            code={code}
                        />
                    );
                }
            }, [signed, code])}
            {signed !== 0 && signed}
            {
            useEffect(() => {
                if (logData.email === true && logData.password === true) {
                    setCode(<Home />)
                    window.location.reload()
                }
                }, [logData]
                )
                }
            {isNaN(parseInt(code)) === true && code}
        </>
    );
}

export default MainPage;
