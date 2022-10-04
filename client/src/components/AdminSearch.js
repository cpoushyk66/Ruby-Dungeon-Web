import React, { useEffect, useState } from "react";

function AdminSearch({typeSearch}) {

    const [datas, setDatas] = useState(null)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`/${typeSearch}`)
        .then(res => {
            if (res.ok) {
                res.json().then(setDatas)
            }
            else {
                res.json().then(data => setErrors([...errors, data.error]))
                setDatas(null)
            }
        })
    }, [typeSearch])

    let index = 0

    function makeTable() {
        console.log(datas)        
        return datas.map(data => <tr style={{"fontSize": "medium", "padding": "4px"}} key={index += 1}>{Object.keys(data).map(key => (key == "spells" || key == "items" || key == "equiped_items") ? null : <td key={index += 1} >{(data[key] == true) ? "1" : ((data[key] == false) ? "0" : data[key])}</td>)}</tr>)
    }

    if (errors.length > 0) return <ol>{errors.entries.map(er => <li>{er.upcase()}</li>)}</ol>

    return (
        <div>
            <table className="admin-table" cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr style={{"fontSize": "larger"}}>
                        {datas != null && datas.length > 0 ? Object.keys(datas[0]).map(key => (key == "spells" || key == "items" || key == "equiped_items") ? null : <td key={index += 1}>{key}</td>) : null}
                    </tr>
                </thead>
                <tbody>
                    {datas != null && datas.length > 0 ? makeTable() : <tr><td>No {typeSearch}</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default AdminSearch