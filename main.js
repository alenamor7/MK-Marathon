import {scorpion, sonya} from './players.js';
import {createElement} from "./element_creation.js";
import {$arena, $formFight, $fightButton} from "./selectors.js";
import {getChangeHpAfterPlayerAttack} from "./attack.js";
import {generateLogs} from "./logs_generation.js";
import {enemyAttack, playerAttack} from "./attack.js";
import {findWinner} from "./winner_finder.js";
import {createReloadButton} from "./reload_button.js";

// even though we have only 1 record in start array, I still wanted to use one function everywhere where I generate logs
generateLogs('start', scorpion, sonya);

function createPlayer(playerObject) {
    const $player = createElement('div', 'player' + playerObject.player);
    const $progressBar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $image = createElement('img');

    $life.style.width = playerObject.hp +'%';
    $name.innerText = playerObject.name;
    $image.src = playerObject.img;

    $player.appendChild($progressBar);
    $player.appendChild($character);

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    $character.appendChild($image);

    return $player;
}

$formFight.addEventListener('submit', (event) => {
    event.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    //scorpion is our player and enemy is hitter for him
    scorpion.changeHp(getChangeHpAfterPlayerAttack(enemy, player));
    scorpion.renderHp();

    //sonya is enemy player and we should attack it, so enemy is a defender
    sonya.changeHp(getChangeHpAfterPlayerAttack(player, enemy));
    sonya.renderHp();

    findWinner(scorpion, sonya);
    // if at least one player has no hp it means that game is over and we change displaying of buttons
    if(scorpion.hp === 0 || sonya.hp === 0) {
        $fightButton.disabled = true;
        createReloadButton();
    }
})

$arena.appendChild(createPlayer(scorpion));
$arena.appendChild(createPlayer(sonya));