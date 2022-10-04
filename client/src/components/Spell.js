import React from "react";

function Spell({currentCharacter, spell}) {

    return (
        <div className="single">
            <h4>{spell.name}</h4>
            <p>{spell.value}</p>
            <p>{spell.flavor_text}</p>
        </div>
    )
}

export default Spell