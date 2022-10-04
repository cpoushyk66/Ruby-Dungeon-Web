import React, {useState, useEffect} from "react";
import DungeonRoom from "./DungeonRoom";

function Dungeon({currentUser, currentCharacter}) {

    const [entered, setEntered] = useState(false)

    return <div className="dungeon-display">
        {currentUser != null ? (currentCharacter != null ? (<div>

            <h1>Welcome {currentCharacter.name} to the Dungeon!</h1>

            <button onClick={() => setEntered(!entered)} >{entered ? "Leave?" : "Enter?"}</button>

            {entered ? <DungeonRoom character={currentCharacter}/>
            : null}
        </div>) : <h1>Make a character to enter the dungeon!</h1>) : 
        <h1>Please Log In to See Dungeon!</h1>}
    </div>
}

export default Dungeon