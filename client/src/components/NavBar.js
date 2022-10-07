import React from "react";
import {Link} from "react-router-dom"
import styled from "styled-components"



function Navbar({currentUser}) {

    const Wrapper = styled.header`
    background: black;
    background-image: url("../assets/images/ruby_ore.gif");
    
    margin: auto;
    height: fit-content;
    border-bottom: 10px solid #6D333D;
    display: inline-block;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    animation: animatedBackground 40s ease-in-out infinite;
    > nav {
        width: 100%;
    }

    @keyframes animatedBackground {
 
        0% { background-position: 0% 0% };


        50% { background-position: 100% 0% };
        100% { background-position: 0% 0% };

      }
    
    `

    const Title = styled.div`
    text-align: center;
    margin: auto;
    font-family: Impact, Charcoal, sans-serif;
    font-size: 45px;
    letter-spacing: 0px;
    word-spacing: 6px;
    color: #f1f1f1;
    font-weight: 400;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: uppercase;
    width: 80%;
    `

    const StyleLink = styled.div`

        width: 100%;
        display: flex;
        justify-content: space-between;

    > a {
        margin-left: 5%;
        text-align: left;
        font-family: Impact, Charcoal, sans-serif;
        font-size: 25px;
        letter-spacing: 2px;
        word-spacing: 2px;
        font-weight: 400;
        font-style: normal;
        font-variant: normal;
        text-transform: uppercase;
        color: white;
        display: inline-block;
        text-decoration: none;
        width: 90%;
    }
    > a:hover {
        color: pink;
        font-size: x-large;
        background: rgb(0, 0, 0, .75);

    }

    
    `

    return(
        <Wrapper>
            <nav style={{"float": "left"}}>
                <Title>Ruby Dungeons - Level, Collect, Enjoy!</Title>
                {currentUser != null ? <StyleLink><Link to="/">Home</Link></StyleLink> : null}
                {currentUser != null ? <StyleLink><Link to="/town">Town</Link></StyleLink> : null}
                {currentUser != null ? <StyleLink><Link to="/shop">Shop</Link></StyleLink> : null}
                {currentUser != null ? <StyleLink><Link to="/academy">Academy</Link></StyleLink> : null}
                {currentUser != null ? <StyleLink><Link to="/dungeon">Dungeon</Link></StyleLink> : null}
            </nav>
        </Wrapper>
    )
}

export default Navbar