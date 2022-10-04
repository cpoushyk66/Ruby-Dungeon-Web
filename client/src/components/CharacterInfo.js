import React, {useState} from "react";
import InventoryItem from "./InventoryItem";

function CharacterInfo({character, handleChangeSelect, handleDeleteCharacter}) {

    const [deleteBool, setDeleteBool] = useState(false)

    let index = 0
    function renderItems() {
        return character.items.length > 0 ? character.items.map(item => <InventoryItem key={index += 1} item={item}/>) : <p>Empty</p>
    }


    return (
        <div className="character-info">
            <h2>{character.name} {character.title != "" ? `the ${character.title}` : ""}</h2>
            <p >Xp: {character.xp} | Level: {character.level} | Gold: {character.gold}</p>
            <p>Health: {character.hp_current} / {character.hp_max}</p>
            <h4>Stats</h4>
            <p>Str: {character.strength} | Dex: {character.dexterity} | Int: {character.intelligence} | Cha: {character.charisma} | Wis: {character.wisdom} | Con: {character.constitution}</p>
            
            <div className="inventory">
                <h4>Inventory</h4>
                {renderItems()}
                </div>
            <button onClick={handleChangeSelect}>Switch</button>
            <button onClick={() => setDeleteBool(!deleteBool)} >{deleteBool ? "Cancel" : "DELETE"}</button>
            {deleteBool ? <div>
                <p>Are you sure you want to delete this character?</p>
                <button onClick={() => {
                    handleDeleteCharacter(character)
                    handleChangeSelect()
                    }}>Yes</button>
            </div> : null}
        </div>
    )
}

export default CharacterInfo