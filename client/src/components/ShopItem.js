import React from "react";

function ShopItem({updateCurrentCharacter, character, buying, item}) {

    function handleBuy(e) {
        e.preventDefault()

        if (character.gold >= item.value)
        {
            fetch(`/characters/${character.id}/buy/${item.id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(updateCurrentCharacter)
                }
                else {
                    
                }
            })
        }
        
    }

    function handleSell(e)
    {
        e.preventDefault()

        if (item.sellable)
        {
            fetch(`/characters/${character.id}/sell/${item.id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(updateCurrentCharacter)
                }
                else {
                    
                }
            })
        }
    }

    function calcPrice() {
        return buying ? Math.floor(item.value * (1 + (1 - character.charisma / 20))) : Math.ceil(item.value * (character.charisma / 20))
    }

    return (
        <div className="single" >
            <p>{item.name}</p>
            <div className={`item-image-${item.image}`}></div>
            <p>{item.flavor_text}</p>
            <p>Cost {calcPrice()} gold!</p>
            {buying ? <button onClick={handleBuy}>Buy</button> : <button onClick={handleSell} >{item.sellable ? "Sell" : "Unsellable"}</button>}
        </div>
    )
}

export default ShopItem