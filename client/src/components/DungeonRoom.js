import React, {useState, useEffect} from "react";
import { DungeonBottom, DungeonCenter, DungeonContainer, DungeonCornerBottomLeft, DungeonCornerBottomRight, DungeonCornerTopLeft, DungeonCornerTopRight, DungeonLeft, DungeonRight, DungeonTop, PlayerSpace } from "../styles/DungeonTileManager";
import Battle from "./Battle";

function DungeonRoom({character, updateCurrentCharacter}) {

    const [dungeon, setDungeon] = useState(null)
    const [position, setPosition] = useState([0, 0])
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

    // return dungeon.dungeon.map(row => <tr key={index += 1} >{row.map(tile => formatRoom(tile))}</tr>)   determineCell(tile.coords, Math.sqrt(dungeon.rooms))


    function movePlayer(newCoords, dungeon) {
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

    function formatRoom(room) {
        switch (room.room_type) {
            case "empty_room":
                return <td key={index += 1} className={`empty_room ${setTileClass(room.coords, Math.sqrt(dungeon.rooms))} ${room.visited ? "visited" : "unvisited"}`}>{room.coords[0] == position[0] && room.coords[1] == position[1] ? <PlayerSpace /> : null}</td>
                break
            case "enemy_room":
                return <td key={index += 1} className={`enemy_room ${setTileClass(room.coords, Math.sqrt(dungeon.rooms))} ${room.visited ? "visited" : "unvisited"}`}>{room.coords[0] == position[0] && room.coords[1] == position[1] ? <PlayerSpace /> : null}</td>
                break
            case "item_room":
                return <td key={index += 1} className={`item_room ${setTileClass(room.coords, Math.sqrt(dungeon.rooms))} ${room.visited ? "visited" : "unvisited"}`}>{room.coords[0] == position[0] && room.coords[1] == position[1] ? <PlayerSpace /> : null}</td>
                break
            case "boss_room":
                return <td key={index += 1} className={`boss_room ${setTileClass(room.coords, Math.sqrt(dungeon.rooms))} ${room.visited ? "visited" : "unvisited"}`}>{room.coords[0] == position[0] && room.coords[1] == position[1] ? <PlayerSpace /> : null}</td>
                break
        }

    }

    function setTileClass(coords, sideLength) {
        if (coords[0] == 0 && coords[1] == 0) {
            return "dungeon-corner-1"
        }
        else if (coords[0] == 0 && coords[1] == sideLength - 1)
            return "dungeon-corner-2"
        else if (coords[0] == 0 && coords[1] != 0 && coords[1] != sideLength - 1)
            return "dungeon-top"
        else if (coords[0] == sideLength - 1 && coords[1] == 0)
            return "dungeon-corner-3"
        else if (coords[0] == sideLength - 1 && coords[1] == sideLength - 1)
            return "dungeon-corner-4"
        else if (coords[0] == sideLength - 1)
            return "dungeon-bottom"
        else if (coords[1] == 0)
            return "dungeon-left"
        else if (coords[1] == sideLength - 1)
            return "dungeon-right"
        else 
            return "dungeon-center"
    }

    function determineCell(coords, sideLength) {
        if (coords[0] == 0 && coords[1] == 0) {
            return <DungeonCornerTopLeft visited={dungeon.dungeon[coords[0]][coords[1]].visited} >{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonCornerTopLeft>
        }
        else if (coords[0] == 0 && coords[1] == sideLength - 1)
            return <DungeonCornerTopRight visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonCornerTopRight>
        else if (coords[0] == 0 && coords[1] != 0 && coords[1] != sideLength - 1)
            return <DungeonTop visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonTop>
        else if (coords[0] == sideLength - 1 && coords[1] == 0)
            return <DungeonCornerBottomRight visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonCornerBottomRight>
        else if (coords[0] == sideLength - 1 && coords[1] == sideLength - 1)
            return <DungeonCornerBottomLeft visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonCornerBottomLeft>
        else if (coords[0] == sideLength - 1)
            return <DungeonBottom visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonBottom>
        else if (coords[1] == 0)
            return <DungeonLeft visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonLeft>
        else if (coords[1] == sideLength - 1)
            return <DungeonRight visited={dungeon.dungeon[coords[0]][coords[1]].visited}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonRight>
        else 
            return <DungeonCenter visited={dungeon.dungeon[coords[0]][coords[1]].visiteds}>{coords[0] == position[0] && coords[1] == position[1] ? <PlayerSpace /> : null}</DungeonCenter>
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

            <DungeonContainer cellPadding={0} cellSpacing={0}>
                <tbody>
                    <tr>
                        <DungeonCornerTopLeft visited={true}> <PlayerSpace /></DungeonCornerTopLeft> <DungeonTop></DungeonTop> <DungeonTop /> <DungeonTop /> <DungeonTop /> <DungeonTop /> <DungeonTop /> <DungeonTop /> <DungeonTop /> <DungeonCornerTopRight />
                    </tr>
                    <tr>
                        <DungeonLeft/> <DungeonCenter /> <DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /> <DungeonRight />
                    </tr>
                    <tr>
                        <DungeonLeft/> <DungeonCenter /> <DungeonCenter /><DungeonCenter><PlayerSpace rotatePlayer={90}/></DungeonCenter> <DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /> <DungeonRight />
                    </tr>
                    <tr>
                        <DungeonLeft/> <DungeonCenter /> <DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /><DungeonCenter /> <DungeonRight />
                    </tr>
                </tbody>
            </DungeonContainer>
        </div>
    )
}
    export default DungeonRoom
