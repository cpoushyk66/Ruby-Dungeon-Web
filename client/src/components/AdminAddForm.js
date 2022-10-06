import React, {useState, useEffect} from "react";

function AdminAddForm({formType, refresh}) {

    const [formData, setFormData] = useState(null)
    const [formSelect, setFormSelect] = useState("POST")
    const [selectId, setSelectId] = useState(1)

    useEffect(() => {
        let response
        switch (formSelect) {
            case "POST":
                response = `/template/${formType}`
                break
            case "PATCH":
                response = `admins/characters/${selectId}`
                break
        }
        fetch(response)
        .then(res => {
            if (res.ok) {
                res.json().then(setFormData)
            }
            else {
                setFormData(null)
            }
        })
    }, [formType, formSelect, selectId])

    function handleSubmit(e) {
        e.preventDefault()

        let response
        switch (formSelect) {
            case "POST":
                response = `/${formType}`
                break
            case "PATCH":
                response = `/${formType}/${selectId}`
                break
        }

        fetch(response, {
            method: formSelect,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {

            }
        })

        e.target.reset()
        refresh()
    }

    function handleUpdateFormData(value, key) {
        setFormData({...formData, [key]: value})
    }


    function generateForm() {

        let inputs = Object.keys(formData).map(key => {
            switch (typeof formData[key]) {
            case "number":
                return <div key={key}>
                            <label htmlFor={key} >{key}: </label>
                            <input id={key} type="number" onChange={(e) => handleUpdateFormData(parseInt(e.target.value), key)} value={formData[key]} placeholder={key}></input>
                        </div>
            case "string":
                return <div key={key}>
                            <label htmlFor={key} >{key}: </label>
                            <input id={key} type="text" onChange={(e) => handleUpdateFormData(e.target.value, key)} value={formData[key]} placeholder={key}></input>
                        </div>
            case "boolean":
                return <div key={key}>
                            <label htmlFor={key} >{key}: </label>
                            <input id={key} type="checkbox" onChange={(e) => handleUpdateFormData(e.target.checked, key)} checked={formData[key]}></input>
                        </div>
        
            }
        })
        return (
            <form className="admin-form" onSubmit={handleSubmit}>
                {inputs}
                <button type="submit" >Submit</button>
            </form>
        )
    }



    return (
        <div>
            <h2>{formType.charAt(0).toUpperCase() + formType.slice(1)} Form</h2>
            <select  onChange={(e) => setFormSelect(e.target.value)} value={formSelect}>
                <option value="POST">Add {formType.charAt(0).toUpperCase() + formType.slice(1)}</option>
                <option value="PATCH">Patch {formType.charAt(0).toUpperCase() + formType.slice(1)}</option>
            </select>
            {formSelect == "PATCH" ? <input type="number" onChange={(e) => setSelectId(e.target.value)} value={selectId}></input> : null}
            {formData != null ? generateForm(): <p>Loading...</p>}
        </div>
    )
}

export default AdminAddForm