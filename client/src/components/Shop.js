import React, {useEffect, useState} from "react";
import ShopItem from "./ShopItem";

function Shop({updateCurrentCharacter, currentCharacter}) {

    const [items, setItems] = useState([])
    const [buyItems, setBuyItems] = useState(true)

    useEffect(() => {
        fetch("/items/random/5")
        .then(res => res.json())
        .then(setItems)
    }, [])

    let index = 0
    function makeBuyTable() {
        return items.map(item => <ShopItem key={index += 1} updateCurrentCharacter={updateCurrentCharacter} character={currentCharacter} buying={true} item={item} />)
    }

    function makeSellTable(){
        return currentCharacter.items.map(item => <ShopItem key={index += 1} updateCurrentCharacter={updateCurrentCharacter} character={currentCharacter} buying={false} item={item} />)
    }

    return (

        <div className="shop-display">
            {currentCharacter != null ? 
                <div>
                    <h1 className="shop-wall-words" >Welcome {currentCharacter.name}</h1>
                    <h3>Would you like to:</h3>
                    <button onClick={() => setBuyItems(true)} >BUY ITEMS</button>
                    <button onClick={() => setBuyItems(false)}>SELL IEMS</button>
                    
                    <div className="shop-list-container">{items.length > 0 && currentCharacter != null ? (buyItems ? makeBuyTable() : makeSellTable()) : null}</div>
                </div>
            : <h1 style={{"color": "white", "verticalAlign": "middle"}}>Please Log In or Make a Character to View Shop!</h1>}
        </div>
    )
}

export default Shop