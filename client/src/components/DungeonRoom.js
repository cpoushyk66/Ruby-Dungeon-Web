import React, {useState, useEffect} from "react";
import { DungeonBottom, DungeonCenter, DungeonContainer, DungeonCornerBottomLeft, DungeonCornerBottomRight, DungeonCornerTopLeft, DungeonCornerTopRight, DungeonLeft, DungeonRight, DungeonTop, PlayerSpace } from "../styles/DungeonTileManager";
import Battle from "./Battle";

function DungeonRoom({character, updateCurrentCharacter}) {

    const [dungeon, setDungeon] = useState(null)
    const [position, setPosition] = useState([0, 0])
    const [rotation, setRotation] = useState(0)
    const [moves, setMoves] = useState(0)
    const [battle, setBattle] = useState(false)
    const [enemies, setEnemies] = useState(0)
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const [difficulty, setDifficulty] = useState(character.level)

    useEffect(() => {
        fetch("/dungeons/generate/10")
        .then(res => res.json())
        .then(data => {
            setDungeon(data)
            let startPos = [Math.floor(Math.random() * Math.sqrt(data.rooms)), Math.floor(Math.random() * Math.sqrt(data.rooms))]
            movePlayer(startPos, data)
        })
    }, [])
    
    function handleBattleWon() {

        let dungeonTemp = [...dungeon.dungeon]
        dungeonTemp[position[0]][position[1]].cleared = true
        setDungeon({
            rooms: dungeon.rooms,
            dungeon: dungeonTemp
        })
        setBattle(false)
    }

    function clamp(num, min, max) {
        return Math.min(Math.max(min, num), max)
    }

    let index = 0
    function makeDungeon() {
       return dungeon.dungeon.map(row => <tr key={index += 1} >{row.map(tile => determineCell(tile.coords, Math.sqrt(dungeon.rooms)))}</tr>)
    }

    function movePlayer(newCoords, dungeon) {
        setRotation(() => {
            if (newCoords[0] > position[0]) {
                return 180
            }
            else if (newCoords[0] < position[0]) {
                return 0
            }
            else if (newCoords[1] < position[1]) {
                return 270
            }
            else if (newCoords[1] > position[1]) {
                return 90
            }
        })
        setPosition([clamp(newCoords[0], 0, Math.sqrt(dungeon.rooms) - 1), clamp(newCoords[1], 0, Math.sqrt(dungeon.rooms) - 1)])
        setDungeon(() => {
            let tempDung = {...dungeon};
            tempDung.dungeon = tempDung.dungeon.map(row => row.map(room => {
                if (room.coords[0] == newCoords[0] && room.coords[1] == newCoords[1]) {
                    room.visited = true
                    
                    if ((room.room_type == "enemy_room" || room.room_type == "boss_room") && !room.cleared) {
                        setEnemies(room.content)
                        setBattle(true)
                    }
                          
                    return room
                }
                else {
                    return room
                }
            }))
            return tempDung
        })
        setMoves(moves + 1)
    }

    function determineCell(coords, sideLength) {
        if (coords[0] == 0 && coords[1] == 0) {
            return <DungeonCornerTopLeft visited={dungeon.dungeon[coords[0]][coords[1]].visited} >{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation} /> : null}</DungeonCornerTopLeft>
        }
        else if (coords[0] == 0 && coords[1] == sideLength - 1)
            return <DungeonCornerTopRight visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation}/> : null}</DungeonCornerTopRight>
        else if (coords[0] == 0 && coords[1] != 0 && coords[1] != sideLength - 1)
            return <DungeonTop visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation} /> : null}</DungeonTop>
        else if (coords[0] == sideLength - 1 && coords[1] == 0)
            return <DungeonCornerBottomRight visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation} /> : null}</DungeonCornerBottomRight>
        else if (coords[0] == sideLength - 1 && coords[1] == sideLength - 1)
            return <DungeonCornerBottomLeft visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation} /> : null}</DungeonCornerBottomLeft>
        else if (coords[0] == sideLength - 1)
            return <DungeonBottom visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation} /> : null}</DungeonBottom>
        else if (coords[1] == 0)
            return <DungeonLeft visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation} /> : null}</DungeonLeft>
        else if (coords[1] == sideLength - 1)
            return <DungeonRight visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation} /> : null}</DungeonRight>
        else 
            return <DungeonCenter visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace rotatePlayer={rotation} /> : null}</DungeonCenter>
    }

    return(
        <div className="dungeon-actual">
            {!battle && dungeon != null ? 
            <DungeonContainer cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td colSpan={dungeon != null ? Math.sqrt(dungeon.rooms) : 1}>Dungeon</td>
                    </tr>
                    <tr>
                        <td colSpan={dungeon != null ? Math.sqrt(dungeon.rooms) : 1}>Turns: {moves}</td>
                    </tr>
                </thead>

                <tbody>
                    {dungeon != null ? makeDungeon() : null}
                </tbody>
            </DungeonContainer> : <Battle handleBattleWon={handleBattleWon} character={character} enemies={enemies != null ? enemies : []}  updateCurrentCharacter={updateCurrentCharacter} difficulty={difficulty}/>}

            {!battle ? <div>
                <button onClick={() => movePlayer([position[0], position[1] + 1], dungeon)}>→</button>
                <button onClick={() => movePlayer([position[0], position[1] - 1], dungeon)}>←</button>
                <button onClick={() => movePlayer([position[0] + 1, position[1]], dungeon)}>↓</button>
                <button onClick={() => movePlayer([position[0] - 1, position[1]], dungeon)}>↑</button>
            </div> : null}
        </div>
    )
}
    export default DungeonRoom
