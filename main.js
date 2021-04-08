const scorpion = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'axe', 'ninja sword'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
};

const sonya ={
    name: 'Sonya',
    hp: 70,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['wind blade', 'garrote wire', 'energy bracelets'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
};

function createPlayer(name, player) {
    const $player = document.createElement('div');
    $player.classList.add(name);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');
    $player.appendChild($progressBar);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = player.hp +'%';
    $progressBar.appendChild($life);

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;
    $progressBar.appendChild($name);

    const $character = document.createElement('div');
    $character.classList.add('character')
    $player.appendChild($character);

    const $image = document.createElement('img');
    $image.src = player.img;
    //juct want to check event listener
    $image.addEventListener('click', function () {
        player.attack();
    });
    $character.appendChild($image);

    const $arena = document.querySelector('.arenas');
    $arena.appendChild($player);
}

createPlayer('player1', scorpion);
createPlayer('player2', sonya);