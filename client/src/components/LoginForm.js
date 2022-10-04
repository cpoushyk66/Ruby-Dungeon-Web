import React, {useState} from "react";

function LoginForm({handleLogin}) {

    const [loginUser, setLoginUser] = useState("")
    const [loginPass, setLoginPass] = useState("")
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {

        e.preventDefault()

        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: loginUser,
                password: loginPass
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(handleLogin)
            }
        })
    }

    return (
        <div className="newUserFormAll">
            <h2>Log In here!</h2>
            <form onSubmit={handleSubmit} className="newUserForm">
                <input onChange={(e) => setLoginUser(e.target.value)}  value={loginUser} type="text" placeholder="username..." required/>
                <input onChange={(e) => setLoginPass(e.target.value)} value={loginPass} type="password" placeholder="password" required/>
                <button type="submit">Join the Adventure!</button>
            </form>
            {errors.length > 0 ? errors : null}
        </div>
    )
}

export default LoginForm