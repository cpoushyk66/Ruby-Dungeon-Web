import React, { useState } from "react";
import CharacterInfo from "./CharacterInfo";
import CharacterLink from "./CharacterLinks";

function ProfileBar({handleDeleteCharacter, handleLogOut, selectCharacter, userCharacters, currentUser, currentCharacter})
{
    const [selectCharBool, setSelectCharBool] = useState(currentCharacter == null)
    
    function charLinks() {
        return currentUser != null && userCharacters != null ? userCharacters.map(character => <CharacterLink key={character.name + character.id} handleDeleteCharacter={handleDeleteCharacter} selectCharacter={selectCharacter} character={character} currentCharacter={currentCharacter} handleChangeSelect={handleChangeSelect}/>): null
    }

    function handleChangeSelect() {
        setSelectCharBool(!selectCharBool)
    }


    return(
        <div className="user-display">

            <h2>Welcome back, {currentUser.username}!</h2>
            { selectCharBool ? 
                <div className="links-container">{charLinks()}</div> : currentCharacter != null ? <CharacterInfo character={currentCharacter} handleChangeSelect={handleChangeSelect} handleDeleteCharacter={handleDeleteCharacter}/> : <div className="links-container">{charLinks()}</div>
            }
            <div className={`player-icon ${currentUser.admin ? "blue-banner" : ""}`}>
                <img src={currentUser != null ? currentUser.image : ""} alt="user image" />
                <p>{currentUser.username}</p>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default ProfileBar