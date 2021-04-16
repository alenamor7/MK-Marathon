const $arena = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');


const HIT = {
    head: 30,
    body: 25,
    foot: 20
}
const ATTACK = ['head', 'body', 'foot'];;


const scorpion = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'axe', 'ninja sword'],
    changeHp,
    elHp,
    renderHp
};

const sonya = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['wind blade', 'garrote wire', 'energy bracelets'],
    changeHp,
    elHp,
    renderHp
};


function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }
    return $tag;
}

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

function createReloadButton() {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    })
    $reloadButtonDiv.appendChild($reloadButton);
    $arena.appendChild($reloadButtonDiv);
}

function changeHp(hpToChange) {
    this.hp -= hpToChange;
    //setting 0 as hp to avoid values above zero
    if (this.hp < 0) {
        this.hp = 0;
    }
}

function elHp() {
    const $playerLife = document.querySelector('.player' + this.player + ' .life');
    return $playerLife;
}

function renderHp() {
    this.elHp().style.width = this.hp + '%';
}

function getRandomNumber(max) {
    const randomNumber = Math.ceil(Math.random() * max);
    return randomNumber;
}

function findWinner(player1, player2) {
    if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(getResultText());
    } else if (player1.hp === 0) {
        $arena.appendChild(getResultText(player2.name));
    } else if (player2.hp === 0) {
        $arena.appendChild(getResultText(player1.name));
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

function enemyAttack() {
    const hit = ATTACK[getRandomNumber(3) - 1];
    const defence = ATTACK[getRandomNumber(3) - 1];
    return {
        value: getRandomNumber(HIT[hit]),
        hit,
        defence
    }
}

/*
This function will be called twice
depending on who is hitter and who is defender
 */
function getChangeHpAfterPlayerAttack(hitter, defender) {
    if (hitter.hit === defender.defence) {
        if (hitter.value > defender.value) {
            return hitter.value - defender.value;
        } else {
            return 0;
        }
    } else {
        return hitter.value;
    }
}


$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

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

    //scorpion is our player and enemy is hitter for him
    scorpion.changeHp(getChangeHpAfterPlayerAttack(enemy, attack));
    scorpion.renderHp();

    //sonya is enemy player and we should attack it, so enemy is a defender
    sonya.changeHp(getChangeHpAfterPlayerAttack(attack, enemy));
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