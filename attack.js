import {scorpion, sonya} from "./players.js";
import {getRandomNumber} from "./random_number.js";
import {$formFight} from "./selectors.js";
import {generateLogs} from "./logs_generation.js";
import {HIT, ATTACK} from "./hit_attack.js";

/*
added also a player to the object of enemy
because it allows me to use generateLog() everywhere I need
 */
export function enemyAttack() {
    const hit = ATTACK[getRandomNumber(3) - 1];
    const defence = ATTACK[getRandomNumber(3) - 1];
    return {
        player: sonya,
        value: getRandomNumber(HIT[hit]),
        hit,
        defence
    }
}

/*
added also a player(scorpion) to the object of our player
because it allows me to use generateLog() everywhere I need
 */
export function playerAttack() {
    const attack = {};
    attack.player = scorpion;

    for (let item of $formFight) {
        const {checked, name, value, hit, defence} = item;
        if (checked && name === 'hit') {
            attack.value = getRandomNumber(HIT[value]);
            attack.hit = value;
        }
        if (checked && name === 'defence') {
            attack.defence = value;
        }
        item.checked = false;
    }

    return attack;
}

/*
This function will be called twice
depending on who is hitter and who is defender
 */
export function getChangeHpAfterPlayerAttack(hitter, defender) {
    const { value : hitterValue, hit : hitterHit, defence: hitterDefence, player: hitterPlayer } = hitter;
    const { value : defenderValue, hit : defenderHit, defence: defenderDefence, player: defenderPlayer } = defender;
    if (hitterHit === defenderDefence) {
        if (hitterValue > defenderValue) {
            const changedHp = hitterValue - defenderValue;
            generateLogs('hit', hitterPlayer, defenderPlayer, changedHp);
            return changedHp;
        } else {
            generateLogs('defence', hitterPlayer, defenderPlayer);
            return 0;
        }
    } else {
        const changedHp = hitterValue;
        generateLogs('hit', hitterPlayer, defenderPlayer, changedHp);
        return changedHp;
    }
}

