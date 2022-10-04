import React from "react";

function LevelUp({character}) {

    function attemptLevelUp(attribute, ammount) {
        fetch(`/characters/${character.id}/level_up`)
    }

    return (
        <div>
            LevelUp
        </div>
    )
}

export default LevelUp