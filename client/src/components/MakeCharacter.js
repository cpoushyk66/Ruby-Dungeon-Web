import React, {useState} from "react";

function MakeCharacter({handleAddCharacter}) {

    const [skillPoints, setSkillPoints] = useState(0)
    const [name, setName] = useState("")
    const [klass, setKlass] = useState("Warrior")
    const [strength, setStrength] = useState(1)
    const [dexterity, setDexterity] = useState(1)
    const [wisdom, setWisdom] = useState(1)
    const [constitution, setConstitution] = useState(1)
    const [intelligence, setIntelligence] = useState(1)
    const [charisma, setCharisma] = useState(1)
    const [makeOn, setMakeOn] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    function startCreation() {
        setSkillPoints(30);
        setMakeOn(true)
    }
   
    function handleSubmit(e) {

        e.preventDefault()
        if (skillPoints <= 0  && submitted)
        {

            const character = {
                name: name,
                klass: klass,
                strength: strength,
                dexterity: dexterity,
                wisdom: wisdom,
                constitution: constitution,
                intelligence: intelligence,
                charisma: charisma,
            }
            
            handleAddCharacter(e, character)
            setCharisma(1)
            setConstitution(1)
            setDexterity(1)
            setIntelligence(1)
            setKlass("Warrior")
            setStrength(1)
            setWisdom(1)
            setName("")
            setSubmitted(false)
            setMakeOn(false)

        }
    }

    function addStrPoint() {
        if (skillPoints > 0 && strength < 20) {
            setStrength(strength + 1)
            setSkillPoints(skillPoints - 1)
        }
    }

    function subStrPoint() {
        if (strength > 1) {
            setStrength(strength - 1)
            setSkillPoints(skillPoints + 1)
        }
    }

    function addDexPoint() {
        if (skillPoints > 0 && dexterity < 20) {
            setDexterity(dexterity + 1)
            setSkillPoints(skillPoints - 1)
        }
    }

    function subDexPoint() {
        if (dexterity > 1) {
            setDexterity(dexterity - 1)
            setSkillPoints(skillPoints + 1)
        }
    }

    function addWisPoint() {
        if (skillPoints > 0 && wisdom < 20) {
            setWisdom(wisdom + 1)
            setSkillPoints(skillPoints - 1)
        }
    }

    function subWisPoint() {
        if (wisdom > 1) {
            setWisdom(wisdom - 1)
            setSkillPoints(skillPoints + 1)
        }
    }

    function addIntPoint() {
        if (skillPoints > 0 && intelligence < 20) {
            setIntelligence(intelligence + 1)
            setSkillPoints(skillPoints - 1)
        }
    }

    function subIntPoint() {
        if (intelligence > 1) {
            setIntelligence(intelligence - 1)
            setSkillPoints(skillPoints + 1)
        }
    }

    function addChaPoint() {
        if (skillPoints > 0 && charisma < 20) {
            setCharisma(charisma + 1)
            setSkillPoints(skillPoints - 1)
        }
    }

    function subChaPoint() {
        if (charisma > 1) {
            setCharisma(charisma - 1)
            setSkillPoints(skillPoints + 1)
        }
    }

    function addConPoint() {
        if (skillPoints > 0 && constitution < 20) {
            setConstitution(constitution + 1)
            setSkillPoints(skillPoints - 1)
        }
    }

    function subConPoint() {
        if (constitution > 1) {
            setConstitution(constitution - 1)
            setSkillPoints(skillPoints + 1)
        }
    }

    return (
        <div className="character-make">
            <h2>Character Creator:</h2>
            <button onClick={startCreation} >Start</button>
            {makeOn ? <form onSubmit={handleSubmit}>

                <p>Points Remaining: {skillPoints}</p>

                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                <p>Class Selection: </p>

                <h2>Select Class</h2>
                <select id="select-class" onChange={(e) => setKlass(e.target.value)} value={klass} required>
                    <option>Warrior</option>
                    <option>Wizard</option>
                    <option>Rogue</option>
                    <option>Sorcerer</option>
                    <option>Bard</option>
                    <option>Paladin</option>
                </select>

                <h2>Strength: {strength}</h2>
                <p>Strength affects how much damage certain weapons do and how much you can carry!</p>
                <button className="skill-button-up" onClick={addStrPoint}></button>
                <button className="skill-button-down" onClick={subStrPoint}></button>

                <h2>Dexterity: {dexterity}</h2>
                <p>Dexterity affects how fast you are, your chance to dodge, and how much some weapons do!</p>
                <button className="skill-button-up" onClick={addDexPoint}></button>
                <button className="skill-button-down" onClick={subDexPoint}></button>

                <h2>Wisdom: {wisdom}</h2>
                <p>Wisdom affects how much you can gather from your opponents!</p>
                <button className="skill-button-up" onClick={addWisPoint}></button>
                <button className="skill-button-down" onClick={subWisPoint}></button>

                <h2>Intelligence: {intelligence}</h2>
                <p>Intelligence affects how many spells you can carry at a time, your mana, and how effective spells are!</p>
                <button className="skill-button-up" onClick={addIntPoint}></button>
                <button className="skill-button-down" onClick={subIntPoint}></button>

                <h2>Charisma: {charisma}</h2>
                <p>Charisma can affect bartering and your ability to enchant enemies!</p>
                <button className="skill-button-up" onClick={addChaPoint}></button>
                <button className="skill-button-down" onClick={subChaPoint}></button>

                <h2>Constitution: {constitution}</h2>
                <p>Constitution affects how much health you have!</p>
                <button className="skill-button-up" onClick={addConPoint}></button>
                <button className="skill-button-down" onClick={subConPoint}></button>

                <p>Finished?</p>
                <button type="submit" onClick={() => setSubmitted(true)} className="sub-btn">Submit</button>
            </form> : null}
        </div>
    )
}

export default MakeCharacter