import {getRandomNumber} from "./random_number.js";
import {$formFight} from "./selectors.js";
import {generateLogs} from "./logs_generation.js";
import {HIT, ATTACK} from "./hit_attack.js";

/*
added also a player to the object of enemy
because it allows me to use generateLog() everywhere I need
 */
export function enemyAttack(player) {
    const hit = ATTACK[getRandomNumber(3) - 1];
    const defence = ATTACK[getRandomNumber(3) - 1];
    return {
        player: player,
        value: getRandomNumber(HIT[hit]),
        hit,
        defence
    }
}

/*
added also a player(scorpion) to the object of our player
because it allows me to use generateLog() everywhere I need
 */
export function playerAttack(player) {
    const attack = {};
    attack.player = player;

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandomNumber(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
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

