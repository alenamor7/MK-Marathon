import {createElement} from "./element_creation.js";
import {$arena, $fightButton, $formFight} from "./selectors.js";
import {enemyAttack, getChangeHpAfterPlayerAttack, playerAttack} from "./attack.js";
import {Player} from "./players.js";
import {findWinner} from "./winner_finder.js";
import {createReloadButton} from "./reload_button.js";
import {generateLogs} from "./logs_generation.js";

export class Game {
    start = () => {
        const scorpion = new Player({
            player: 1,
            name: 'Scorpion',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
        });
        const sonya = new Player({
            player: 2,
            name: 'Sonya',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
        });

        generateLogs('start', scorpion, sonya);

        $arena.appendChild(this.createPlayer(scorpion));
        $arena.appendChild(this.createPlayer(sonya));

        this.createFormFightEventListener(scorpion, sonya);
    }

    createFormFightEventListener = (player1, player2) => {
        $formFight.addEventListener('submit', (event) => {
            event.preventDefault();
            const enemy = enemyAttack(player2);
            const player = playerAttack(player1);

            //scorpion is our player and enemy is hitter for him
            player1.changeHp(getChangeHpAfterPlayerAttack(enemy, player));
            player1.renderHp();

            //sonya is enemy player and we should attack it, so enemy is a defender
            player2.changeHp(getChangeHpAfterPlayerAttack(player, enemy));
            player2.renderHp();

            findWinner(player1, player2);
            // if at least one player has no hp it means that game is over and we change displaying of buttons
            if(player1.hp === 0 || player2.hp === 0) {
                $fightButton.disabled = true;
                createReloadButton();
            }
        });
    }

    createPlayer = ({player, hp, name, img}) => {
        const $player = createElement('div', `player${player}`);
        const $progressBar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $character = createElement('div', 'character');
        const $image = createElement('img');

        $life.style.width = hp +'%';
        $name.innerText = name;
        $image.src = img;

        $player.appendChild($progressBar);
        $player.appendChild($character);

        $progressBar.appendChild($life);
        $progressBar.appendChild($name);

        $character.appendChild($image);

        return $player;
    }
}