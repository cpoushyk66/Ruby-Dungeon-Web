import React from "react";
import styled from "styled-components";

export const DungeonContainer = styled.div`

    display: flex;
    flex-wrap: wrap;

    > div {
        flex: 1 0 9.2%;
        background-repeat: no-repeat;
        background-size: cover;
    }
`

export const DungeonCenter = styled.div`
    background-image: url("../public/assets/images/dungeon-center.png");
`

export const DungeonLeft = styled.div`
    background-image: url("../public/assets/images/dungeon-side.png");
`