import React, {useEffect, useState} from "react";
import ShopItem from "./ShopItem";
import styled from "styled-components";

function Shop({updateCurrentCharacter, currentCharacter}) {

    const Shop = styled.div`
    background-image: url("../assets/images/wood_wall.png");
    background-size: 100px 100px;
    color: black;
    text-align: center;
    margin: auto;
    margin-top: 10px;
    outline: #623805 ridge 5px;
    padding-bottom: 10%;
    `

    const ShopHeader = styled.h1`
    background-image: url("../assets/images/gold_wall.png");
    margin: auto;
    padding: 10px;
    width: 50%;
    outline: #623805 ridge 5px;
    color:#6D333D;
    `
    const ShopHeader2 = styled.h2`
    background-image: url("../assets/images/gold_wall.png");
    margin: auto;
    padding: 10px;
    width: 40%;
    outline: #623805 ridge 5px;
    outline-offset: -5px;
    color:#6D333D;
    `
    
    const ItemContainer = styled.div`
    background-image: url("../assets/images/shelf.png");
    background-size: 25%;
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    `

    const ShopButtons = styled.button`
    margin: auto;
    padding: 10px;
    width: 20%;
    outline: #623805 ridge 5px;
    outline-offset: -5px;
    color:#6D333D;
    `

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

        <Shop>
            {currentCharacter != null ? 
                <div>
                    <ShopHeader>Welcome {currentCharacter.name}</ShopHeader>
                    <ShopHeader2>Would you like to:</ShopHeader2>
                    <ShopButtons onClick={() => setBuyItems(true)} >BUY ITEMS</ShopButtons>
                    <ShopButtons onClick={() => setBuyItems(false)}>SELL IEMS</ShopButtons>
                    
                    <ItemContainer>{items.length > 0 && currentCharacter != null ? (buyItems ? makeBuyTable() : makeSellTable()) : null}</ItemContainer>
                </div>
            : <ShopHeader>Select a Character to View Shop!</ShopHeader>}
        </Shop>
    )
}

export default Shop