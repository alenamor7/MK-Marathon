import {generateLogs} from "./logs_generation.js";
import {$arena} from "./selectors.js";
import {createElement} from "./element_creation.js";

export function findWinner(player1, player2) {
    const { hp: player1Hp, name: player1Name} = player1;
    const { hp: player2Hp, name: player2Name} = player2;
    if (player1Hp === 0 && player2Hp === 0) {
        generateLogs('draw');
        $arena.appendChild(getResultText());
    } else if (player1Hp === 0) {
        generateLogs('end', player2, player1);
        $arena.appendChild(getResultText(player2Name));
    } else if (player2.hp === 0) {
        generateLogs('end', player1, player2);
        $arena.appendChild(getResultText(player1Name));
    }
}

function getResultText(name) {
    const $loseTitle = createElement('div', 'winTitle');
    // if name is not null then we print the name of a winner - otherwise it's a draw
    if(name) {
        $loseTitle.innerText = name + ' Wins';
    } else {
        $loseTitle.innerText = 'Draw'; //tested it, works correctly and 'Draw' is displayed
    }
    return $loseTitle;
}