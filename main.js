const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $reloadButton = createReloadButton();

const scorpion = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'axe', 'ninja sword'],
    changeHp: changeHP,
    elHp: elHp,
    renderHp: renderHp
};

const sonya = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['wind blade', 'garrote wire', 'energy bracelets'],
    changeHp: changeHP,
    elHp: elHp,
    renderHp: renderHp
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
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $restartButton = createElement('button', 'button');
    $restartButton.innerText = 'Restart';
    $restartButton.style.visibility = 'hidden';

    $reloadWrap.appendChild($restartButton);
    $arena.appendChild($reloadWrap);

    return $restartButton;
}

function changeHP(hpToChange) {
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

function getRandomNumber() {
    const randomNumber = Math.ceil(Math.random() * 20);
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

function changeButtonsStyleAfterFinish() {
    $randomButton.disabled = true;
    $reloadButton.style.visibility = 'visible';
}

$randomButton.addEventListener('click', function () {
    scorpion.changeHp(getRandomNumber());
    scorpion.renderHp();
    sonya.changeHp(getRandomNumber());
    sonya.renderHp();
    findWinner(scorpion, sonya);
    // if at least one player has no hp it means that game is over and we change displaying of buttons
    if(scorpion.hp === 0 || sonya.hp === 0) {
        changeButtonsStyleAfterFinish();
    }
});

$reloadButton.addEventListener('click', function () {
    window.location.reload();
})

$arena.appendChild(createPlayer(scorpion));
$arena.appendChild(createPlayer(sonya));