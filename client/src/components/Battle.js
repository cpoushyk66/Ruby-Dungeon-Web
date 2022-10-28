import React, { useEffect, useState } from "react";

function Battle({handleBattleWon, character, updateCurrentCharacter, enemies, difficulty}) {

    const [enemyDatas, setEnemyDatas] = useState(null)
    const [turnWho, setTurnWho] = useState(0)
    useEffect(() => {
        fetch(`/dungeons/get_leveled_enemies/${enemies}/${difficulty}`)
        .then(res => res.json())
        .then(setEnemyDatas)
    }, [])

    function evaluateBattleState() {

        if (character.hp_current == 0) {
            return [false, "lost"]
        }
        else if (enemyDatas.filter(enemy => enemy.hp_current > 0).length === 0) {
            return [false, "won"]
        }
        else {
            return [true, "continue"]
        }

    }

    function attackEnemy(attacked) {
        setEnemyDatas(() => {
            return enemyDatas.map(enemy => {
                if (enemy.id == attacked.id) {
                enemy.hp_current = enemy.hp_current - character.attack_damage
                    if (enemy.hp_current < 0) {
                        enemy.hp_current = 0
                    }

                    if (enemy.hp_current == 0) {
                        loot(enemy)
                    }
                }
                return enemy
                
            })
        })


        setTurnWho(turnWho + 1)
    }

    function loot(enemy) {
        let characterM = {...character}
        characterM.items = [...characterM.items, ...enemy.items]
        characterM.xp += Math.floor(Math.random() * enemy.level * 10) + enemy.level
        characterM.gold += enemy.gold
        console.log(characterM.xp)
        updateCurrentCharacter(characterM)
    }

    function attackCharacter(attacker) {
        let characterD = character
        characterD.hp_current = characterD.hp_current - attacker.attack_damage
        if (characterD.hp_current < 0) {
            characterD.hp_current = 0
        }
        updateCurrentCharacter(characterD)
    }

    function heal(target, type) {

        if (type == "character") {
            let characterD = character
            characterD.hp_current = characterD.hp_current + characterD.spell_damage
            if (characterD.hp_current > characterD.hp_max) {
                characterD.hp_current = characterD.hp_max
            }
            updateCurrentCharacter(characterD)
        }
        else if (type == "enemy") {
            setEnemyDatas(() => {
                return enemyDatas.map(enemy => {
                    if (enemy.id == target.id) {
                        console.log(enemy.hp_current + target.spell_damage * 10)
                    enemy.hp_current = enemy.hp_current + target.spell_damage
                        if (enemy.hp_current > enemy.hp_max) {
                            enemy.hp_current = enemy.hp_max
                        }
                    }
                    return enemy
                    
                })
            })
        }
        
    }



    function showTurn() {
        if (turnWho == 0) {
           return <h2>Your Turn!</h2>
        }
        else if (turnWho <= enemyDatas.length) {
            if (enemyDatas[turnWho - 1].hp_current > 0){
                enemyTurn(enemyDatas[turnWho - 1])
            }
            else {
                setTurnWho(turnWho + 1)
            }
        }
        else {
            setTurnWho(0)
        }
    }

    function enemyTurn(enemy) {
        setTurnWho(turnWho + 1)
        if (enemy.hp_current / enemy.hp_max * 100 <= 30) {
            heal(enemy, "enemy")
            console.log("WOOWOWOO" +enemy.name)
        }
        else {
            attackCharacter(enemy)
        }
    }

    function formatEnemies()  {
        return enemyDatas.map(enemy => {
        return <div className="enemy-display">
            <p>{enemy.name}</p>
            <p>{enemy.race} {enemy.klass}</p>
            <p>Level: {enemy.level}</p>

            {enemy.hp_current > 0 ? 
            <div>
                <div className="resource-bar">
                    <div style={{"width": `${enemy.hp_current / enemy.hp_max * 100}%`, "backgroundColor": "green", "height": "10px"}} ></div>
                </div>
                <div className="resource-bar">
                    <div style={{"width": `${enemy.mp_current / enemy.mp_max * 100}%`, "backgroundColor": "blue", "height": "10px"}} ></div>
                </div>

                <button onClick={() => attackEnemy(enemy)} >
                    Attack: {enemy.name}
                </button>
            </div>
             : <div>Dead</div>
             }

        </div>
    })
    }
    return (
        <div className="battle">
            BATTTLE
            <div>{enemyDatas != null && evaluateBattleState()[0] ? formatEnemies() : enemyDatas != null ? <div>
                <h2>You {evaluateBattleState()[1]}!</h2>
                <button onClick={handleBattleWon}>Return to Dungeon</button>
                </div> : <h2>Loading....</h2>}</div>
            {enemyDatas != null && evaluateBattleState()[0] ? showTurn() : null}
            <div>
            <button onClick={() => heal(character, "character")}>HEAL</button>
            <div className="resource-bar">
                    <div style={{"width": `${character.hp_current / character.hp_max * 100}%`, "backgroundColor": "green", "height": "10px"}} ></div>
                </div>
                <div className="resource-bar">
                    <div style={{"width": `${character.mp_current / character.mp_max * 100}%`, "backgroundColor": "blue", "height": "10px"}} ></div>
                </div>
            </div>
        </div>
    )
}

export default Battle