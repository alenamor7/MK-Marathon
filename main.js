const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const scorpion = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'axe', 'ninja sword'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
};

const sonya = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['wind blade', 'garrote wire', 'energy bracelets'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
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

function changeHP(playerObject) {
    const $playerLife = document.querySelector('.player' + playerObject.player + ' .life');
    const lifeChange = Math.ceil(Math.random() * 20);
    playerObject.hp -= lifeChange;
    //setting 0 as hp to avoid values above zero
    if (playerObject.hp < 0) {
        playerObject.hp = 0;
    }

    $playerLife.style.width = playerObject.hp + '%';
}

function findWinner(player1, player2) {
    if (player1.hp === 0 && player2.hp === 0) {
        displayWinner();
    } else if (player1.hp === 0) {
        displayWinner(player2.name);
    } else if (player2.hp === 0) {
        displayWinner(player1.name);
    }
}

function displayWinner(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    // if name is not null then we print the name of a winner - otherwise it's a draw
    if(name) {
        $loseTitle.innerText = name + ' Wins';
    } else {
        $loseTitle.innerText = 'Draw'; //tested it, works correctly and 'Draw' is displayed
    }
    $arena.appendChild($loseTitle);
    $randomButton.disabled = true;
}

$randomButton.addEventListener('click', function () {
    changeHP(scorpion);
    changeHP(sonya);
    findWinner(scorpion, sonya);
});

$arena.appendChild(createPlayer(scorpion));
$arena.appendChild(createPlayer(sonya));