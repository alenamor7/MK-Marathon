const $arena = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20
}
const ATTACK = ['head', 'body', 'foot'];;
const logs = {
    start: ['Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.'],
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: ['Ничья - это тоже победа!']
};

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

// even though we have only 1 record in start array, I still wanted to use one function everywhere where I generate logs
generateLogs('start', scorpion, sonya);

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
        generateLogs('draw');
        $arena.appendChild(getResultText());
    } else if (player1.hp === 0) {
        generateLogs('end', player2, player1);
        $arena.appendChild(getResultText(player2.name));
    } else if (player2.hp === 0) {
        generateLogs('end', player1, player2);
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

/*
added also a player to the object of enemy
because it allows me to use generateLog() everywhere I need
 */
function enemyAttack() {
    const hit = ATTACK[getRandomNumber(3) - 1];
    const defence = ATTACK[getRandomNumber(3) - 1];
    return {
        player: sonya,
        value: getRandomNumber(HIT[hit]),
        hit,
        defence
    }
}

/*
added also a player(scorpion) to the object of our player
because it allows me to use generateLog() everywhere I need
 */
function playerAttack() {
    const attack = {};
    attack.player = scorpion;

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
function getChangeHpAfterPlayerAttack(hitter, defender) {
    if (hitter.hit === defender.defence) {
        if (hitter.value > defender.value) {
            const changedHp = hitter.value - defender.value;
            generateLogs('hit', hitter.player, defender.player, changedHp);
            return changedHp;
        } else {
            generateLogs('defence', hitter.player, defender.player);
            return 0;
        }
    } else {
        const changedHp = hitter.value
        generateLogs('hit', hitter.player, defender.player, changedHp);
        return changedHp;
    }
}

function getRandomLog(type) {
    const randomLog = logs[type][getRandomNumber(logs[type].length) - 1];
    return randomLog;
}

function generateLogs(type, player1, player2, changedHp) {
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
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}

function generateTime() {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return time;
}

$formFight.addEventListener('submit', function (event) {
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