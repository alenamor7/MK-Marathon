import {logs} from "./logs.js";
import {scorpion, sonya} from "./players.js";
import {$chat} from "./selectors.js";
import {getRandomNumber} from "./random_number.js";

function getRandomLog(type) {
    const randomLog = logs[type][getRandomNumber(logs[type].length) - 1];
    return randomLog;
}

export function generateLogs(type, player1, player2, changedHp) {
    const randomLog = getRandomLog(type);
    let text;
    let el;
    switch (type) {
        case 'start' :
            text = randomLog.replace('[time]', generateTime())
                .replace('[player1]', scorpion.name)
                .replace('[player2]', sonya.name);
            el = `<p>${text}</p>`;
            break;
        case 'end' :
            text = randomLog.replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
            el = `<p>${text}</p>`;
            break;
        case 'hit' :
            text = randomLog.replace('[playerKick]', player1.name)
                .replace(['[playerDefence]'], player2.name);
            // subtract changeHp from player's hp because hp is not yet changed
            const resultHp = (player2.hp - changedHp) < 0 ? 0 : (player2.hp - changedHp);
            el = `<p>${generateTime()} - ${text} -${changedHp} [${resultHp}/100] </p>`;
            break;
        case 'defence' :
            text = randomLog.replace('[playerKick]', player1.name)
                .replace(['[playerDefence]'], player2.name);
            el = `<p>${generateTime()} - ${text}</p>`;
            break;
        case 'draw' :
            el = `<p>${randomLog}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}

function generateTime() {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return time;
}