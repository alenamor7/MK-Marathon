import {changeHp, elHp, renderHp} from "./player_functions.js";

export const scorpion = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'axe', 'ninja sword'],
    changeHp,
    elHp,
    renderHp
};

export const sonya = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['wind blade', 'garrote wire', 'energy bracelets'],
    changeHp,
    elHp,
    renderHp
};
