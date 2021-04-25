export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    }

    changeHp = (hpToChange) => {
        this.hp -= hpToChange;
        //setting 0 as hp to avoid values above zero
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    elHp = () => {
        const $playerLife = document.querySelector(`.player${this.player} .life`);
        return $playerLife;
    }

    renderHp = () => {
        this.elHp().style.width = `${this.hp}%`;
    }

    attack = () => {
        console.log(`${this.name} ATTACK!!!`);
    }
}

