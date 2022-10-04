import React, {useEffect, useState} from "react";
import LevelUp from "./LevelUp";
import MakeCharacter from "./MakeCharacter";
import Spell from "./Spell";


function Academy({handleAddCharacter, currentUser, currentCharacter}) {

    const [buttonResult, setButtonResults] = useState("")


    // function makeSpells () {
    //     return spells.map(spell => <Spell key={spell.id + spell.name} currentCharacter={currrentCharacter} spell={spell} />)
    // }


    function processChoice() {
        switch (buttonResult)
        {
            case "make":
                return <MakeCharacter handleAddCharacter={handleAddCharacter}/>
                break;
            case "level":
                return <LevelUp character={currentCharacter}/>
                break;
            case "learn":
            break;
        }
    }
    return(
        <div className="academy-display">
            { currentUser ? <div>

            <h1>Welcometo the Academy!</h1>
            <h2>Train up new characters!</h2>

            <button onClick={() => setButtonResults("make")}>Make Character!</button>

            <button onClick={() => setButtonResults("level")}>Level Character</button>

            <button onClick={() => setButtonResults("learn")}>Learn Spells!</button>

            {processChoice()}
        
            </div> : <h1>Please Log In to See Academy!</h1>}
        </div>
    )
}

export default Academy