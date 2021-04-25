import {logs} from "./logs.js";
import {$chat} from "./selectors.js";
import {getRandomNumber} from "./random_number.js";

function getRandomLog(type) {
    const randomLog = logs[type][getRandomNumber(logs[type].length) - 1];
    return randomLog;
}

export function generateLogs(type, { name: playerName1 } = {}, { name: playerName2, hp: playerHp2 } = {}, changedHp) {
    const randomLog = getRandomLog(type);
    let text;
    let el;
    switch (type) {
        case 'start' :
            text = randomLog.replace('[time]', generateTime())
                .replace('[player1]', playerName1)
                .replace('[player2]', playerName2);
            el = `<p>${text}</p>`;
            break;
        case 'end' :
            text = randomLog.replace('[playerWins]', playerName1)
                .replace('[playerLose]', playerName2);
            el = `<p>${text}</p>`;
            break;
        case 'hit' :
            text = randomLog.replace('[playerKick]', playerName1)
                .replace(['[playerDefence]'], playerName2);
            // subtract changeHp from player's hp because hp is not yet changed
            const resultHp = (playerHp2 - changedHp) < 0 ? 0 : (playerHp2 - changedHp);
            el = `<p>${generateTime()} - ${text} -${changedHp} [${resultHp}/100] </p>`;
            break;
        case 'defence' :
            text = randomLog.replace('[playerKick]', playerName1)
                .replace(['[playerDefence]'], playerName2);
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