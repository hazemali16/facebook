import { useEffect, useState } from "react";
import user from "./user.jpg";
import Home from "./Home";

function SignUp(props) {
    const [checked, setChecked] = useState(0);
    function checkCode() {
        let inputCode = document.querySelector(".input-code");
        if (inputCode.value === props.code) {
            setChecked(1);
            setTimeout(() => {
                document.querySelector(".code-page").remove();
            }, 100);
            let signData = {
                user_name: props.fristName + " " + props.lastName,
                email: props.email,
                password: props.password,
                code: false,
            };
            fetch("https://hazem.pythonanywhere.com/submit-data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signData),
            });
            window.localStorage.setItem("logged", "logged")
            window.localStorage.setItem("email", props.email)
        } else {
            inputCode.style.border = "1px solid red";
        }
    }
    function reSend() {
        fetch("https://hazem.pythonanywhere.com/submit-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: props.code, email: props.email }),
        });
    }
    return (
        <>
            <div className="code-page">
                <div className="code-box">
                    <h3>We'll send you a code to your email address</h3>
                    <div className="box-info">
                        <div className="info">
                            <p>We send you a code to this email address:</p>
                            <span>{props.email}</span>
                        </div>
                        <div className="user">
                            <img src={user} alt="" />
                            <span className="user-name">
                                {props.fristName} {props.lastName}
                            </span>
                            <span className="f-user">Facebook user</span>
                        </div>
                    </div>
                    <p className="write">Write your activate code here:</p>
                    <input className="input-code" type="text" placeholder="Code*" />
                    <div className="btns">
                        <span className="r-send" onClick={reSend}>
                            resend
                        </span>
                        <span className="create-user" onClick={checkCode}>
                            Continue
                        </span>
                    </div>
                </div>
            </div>
            {useEffect(() => {
                if (checked === 1) { 
                    setChecked(<Home />);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            }, [checked])}
            {checked !== 0 && checked}
        </>
    );
}

export default SignUp;
