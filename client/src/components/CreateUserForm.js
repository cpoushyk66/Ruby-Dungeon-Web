import React, { useState } from "react";

function CreateUserForm({handleLogin}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault()

        fetch("users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password,
                image: image
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(handleLogin)
            }
            else {
                res.json().then(error => setErrors([...errors, error]))
            }
        })
    }
    
    return (
        <div className="newUserFormAll">
            <h2>Sign Up here!</h2>
            <form onSubmit={handleSubmit} className="newUserForm">
                <input onChange={(e) => setUsername(e.target.value)}  value={username} type="text" placeholder="username..." required/>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password" required/>
                <input onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder="img url..." required/>
                <button type="submit">Join the Adventure!</button>
            </form>
        </div>
    )
}

export default CreateUserForm