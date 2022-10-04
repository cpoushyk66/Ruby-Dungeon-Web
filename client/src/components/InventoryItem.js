import React, {useState} from "react";

function InventoryItem({item}) {

    function rarityClass() {
        let rarities = ["common", "uncommon", "rare", "super-rare", "legendery", "unique"]
        return rarities[item.rarity]
    }

    const [clicked, setClicked] = useState(false)
    return (
        <div onClick={() => setClicked(!clicked)} >
            <p className={rarityClass()} >{item.name} - {item.item_type}</p>
            { clicked ?
                <div className="item-details">
                    <p>Base Value: {item.value}</p>
                    <p>Class Restrictions: {item.class_restriction}</p>
                    <p>Bonus: {item.bonus_type}</p>
                    <p>Bonus Amount: {item.bonus}</p>
                    <p>"{item.flavor_text}"</p>
                    <p>{item.sellable ? "Sellable" : "Not Sellable"}</p>
                </div>
             : null}
        </div>
    )
}

export default InventoryItem