import React from "react";
import {useNavigate} from "react-router-dom"

function Town() {

    const navigate = useNavigate();

    function generateMap() {
        let map = [
            ["trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees"],
            ["trees", "trees", "academy", "trees", "trees", "trees", "trees", "trees", "dungeon", "trees"],
            ["trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "roads up", "trees"],
            ["trees", "trees", "trees", "academy", "trees", "trees", "shop", "trees", "roads tall", "trees"],
            ["trees", "", "trees", "roads up", "trees", "trees", "roads up", "trees", "roads tall", "trees"],
            ["trees", "trees", "trees", "roads corner1", "roads wide", "roads wide", "roads t1", "roads wide", "roads corner3", "trees"],
            ["trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees"],
            ["trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees"],
            ["trees", "dungeon", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees"],
            ["trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees", "trees"],
            
        ]

        function handleMapClick(y) {
            if (paths.includes(y))
            {
                navigate(`/${y}`)
            }
        }
        let paths = ["academy", "dungeon", "shop"]
        let index = 0
        let map2 = map.map(x => <tr key={index += 1}>{x.map(y => <td key={index += 1} onClick={() => handleMapClick(y)} className={y}></td>)}</tr>)
        console.log(map[0][0])
        return map2
    }
    return(
        <div style={{"textAlign": "center"}}>
            <table className="town" cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td style={{"color": "white"}} colSpan={10}><h1>Town Map</h1></td>
                    </tr>
                </thead>
                <tbody className="grass">
                    {generateMap()}
                </tbody>
            </table>
        </div>
    )
}

export default Town