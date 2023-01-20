import React from "react";
import styled from "styled-components";

export const DungeonContainer = styled.table`

    width: 80%;
    background-color: #636363;

    > tbody tr td {
        width: 10%;
        height: 0;
        padding-top: 10%;
        background-repeat: no-repeat;
        background-size: contain;
        margin: auto;
        content: "";
        text-align: center;
    }
`

export const DungeonCenter = styled.td`
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
    background-image: url("../assets/images/dungeon-center.png");
`

export const DungeonLeft = styled.td`
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
    background-image: url("../assets/images/dungeon-side.png");
`

export const DungeonRight = styled.td`
    background-image: url("../assets/images/dungeon-side.png");
    transform: rotate(180deg);
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
`

export const DungeonBottom = styled.td`
    background-image: url("../assets/images/dungeon-side.png");
    transform: rotate(270deg);
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
`

export const DungeonTop = styled.td`
    background-image: url("../assets/images/dungeon-side.png");
    transform: rotate(90deg);
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
`

export const DungeonCornerTopLeft = styled.td`
    background-image: url("../assets/images/dungeon-corner.png");
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
`

export const DungeonCornerTopRight = styled.td`
    background-image: url("../assets/images/dungeon-corner.png");
    transform: rotate(90deg);
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
`

export const DungeonCornerBottomRight = styled.td`
    background-image: url("../assets/images/dungeon-corner.png");
    transform: rotate(270deg);
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
`

export const DungeonCornerBottomLeft = styled.td`
    background-image: url("../assets/images/dungeon-corner.png");
    transform: rotate(180deg);
    filter: brightness(${props => props.visited != null && props.visited ? "100%" : "50%"});
`

export const PlayerSpace = styled.div`
    background-image: url("../assets/images/player.png");
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: contain;

    content: &nbsp;

    transform: rotate(${props => props.rotatePlayer || 0}deg);

`