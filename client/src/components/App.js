import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import Navbar from "./NavBar";
import Home from "./Home";
import Town from "./Town";
import ProfileBar from "./ProfileBar";
import CreateUserForm from "./CreateUserForm";
import Shop from "./Shop";
import Academy from "./Academy";
import LoginForm from "./LoginForm";
import Dungeon from "./Dungeon";
import AdminControls from "./AdminControls";

function App() {

    const [currentUser, setCurrentUser] = useState(null)
    const [userCharacters, setUserCharacters] = useState([])
    const [currentCharacter, setCurrentCharacter] = useState(null)
    const [login, setLogin] = useState(false);
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch("/me").then((res) => {
            if (res.ok) {
              res.json().then(handleLogin);
            }
          });
    }, [])



    function handleLogin(user) {
        setCurrentUser(user)
        fetch(`users/${user.id}/characters`)
        .then(res => {
            if (res.ok) {
                res.json().then(characters => {
                    setUserCharacters(characters)
                })
            }
        })    
    }

    function updateCurrentCharacter(char) {
        setUserCharacters(() => userCharacters.map(character => {
            if (character.id == char.id) return char

            return character
        }))

        setCurrentCharacter(char)
    }

    function handleDeleteCharacter(character) {
        fetch(`characters/${character.id}`, {
            method: "DELETE"
        })
        let newCharacters = userCharacters.filter(char => char.id != character.id)
        setUserCharacters(newCharacters)
        setCurrentCharacter(null)
    }


    //User Functions
    

    function selectCharacter(char) {
        setCurrentCharacter(userCharacters.find(character => character.id === char.id))
    }

    function handleLogOut() {
        setLogin(false)
        fetch("/logout", {
            method: "DELETE"
        })
        setCurrentUser(null)
        setUserCharacters([])
        setCurrentCharacter(null)
    }

    function handleAddCharacter(e, character) {
        e.preventDefault()

        let newCharacter = {
            name: character.name,
            title: "",
            xp: 0,
            klass: character.klass,
            strength: character.strength,
            dexterity: character.dexterity,
            wisdom: character.wisdom,
            constitution: character.constitution,
            intelligence: character.intelligence,
            charisma: character.charisma,
            gold: 25,
            user_id: currentUser.id

        }

        fetch("/characters", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCharacter)
        })
        .then(res => {
            if (res.ok) {
                res.json().then( characterData => {
                    setUserCharacters([...userCharacters, characterData])
                    setCurrentCharacter(characterData)
                })
            }
            else {
                res.json().then(error => setErrors([...errors, error.error]))
            }
        })
    }

    return(
        <div className={`App`}>
            <Navbar/>
            {currentUser == null ? <div className="login-buttons newUserForm">
                 <button className="button" onClick={() => setLogin(true)}>Log In</button> 
                <button className="button" onClick={() => {
                    setLogin(false)
                    setCurrentUser(null)
                }}>Sign Up</button>
                
            </div> : null}
            {currentUser != null ? <ProfileBar handleDeleteCharacter={handleDeleteCharacter} handleLogOut={handleLogOut} selectCharacter={selectCharacter} currentUser={currentUser} userCharacters={userCharacters} currentCharacter={currentCharacter}/> :
            login ? <LoginForm handleLogin={handleLogin}/>
            : <CreateUserForm handleLogin={handleLogin}/>}
            
            {currentUser != null && currentUser.admin ? <AdminControls currentUser={currentUser}/> : null}
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/town" element={<Town/>} />
                <Route path="shop" element={<Shop updateCurrentCharacter={updateCurrentCharacter} currentCharacter={currentCharacter}/>} />
                <Route path="/academy" element={<Academy handleAddCharacter={handleAddCharacter} currentUser={currentUser} currentCharacter={currentCharacter} />} />
                <Route path="/dungeon" element={<Dungeon currentUser={currentUser} currentCharacter={currentCharacter} />} />
            </Routes>
            {errors.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errors.map((error) => (
                    <li key={error}>{error}</li>
                    ))}
                </ul>
                )}
        </div>
    )
}

export default App