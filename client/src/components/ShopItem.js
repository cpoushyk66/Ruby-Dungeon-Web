import React from "react";
import styled from "styled-components";

function ShopItem({updateCurrentCharacter, character, buying, item}) {

    const Item = styled.div`
    margin: auto;
    width: 20%;
    height: 0;
    padding-bottom: 20%;
    float: left;
    color: white;
    
    background-image: url("../assets/images/shop_item_background.png");
    background-size: contain;
    overflow-y: auto;

    > p {
        color: black;
        padding: 5px;
    }
    `

    const ItemImage = styled.div`
    content: url("${item.image}");
    width: 100px;
    height: 100px;
    text-align: center;
    margin: auto;
    `

    const ItemButton = styled.button`
    
    &:hover {
        background: grey;
    }
    `

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
        <Item>
            <p>{item.name}</p>
            <ItemImage></ItemImage>
            <p>{item.flavor_text}</p>
            <p>Cost {calcPrice()} gold!</p>
            <p>Used by: {item.class_restriction}</p>
            {buying ? <ItemButton onClick={handleBuy}>Buy</ItemButton> : <ItemButton onClick={handleSell} >{item.sellable ? "Sell" : "Unsellable"}</ItemButton>}
        </Item>
    )
}

export default ShopItem