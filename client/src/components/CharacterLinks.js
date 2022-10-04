import React, { useState } from "react";

function CharacterLink({selectCharacter, character, currentCharacter, handleChangeSelect}) {

    function handleClick() {
        selectCharacter(character)
        handleChangeSelect()
    }
    
    return (
        <div onClick={handleClick} className={`character-link ${currentCharacter != null && character.id === currentCharacter.id ? "blue-banner" : ""}`} style={{"float": "left"}}>
            <p>{character.name + " " + character.title}</p>
            <div>
                <p>Class: {character.klass}</p>                
                <p>Level: {character.level} Xp: {character.xp}</p>
            </div>
            
        </div>
    )
}

export default CharacterLink