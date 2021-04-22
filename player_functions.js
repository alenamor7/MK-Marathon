export function changeHp(hpToChange) {
    this.hp -= hpToChange;
    //setting 0 as hp to avoid values above zero
    if (this.hp < 0) {
        this.hp = 0;
    }
}

export function elHp() {
    const $playerLife = document.querySelector('.player' + this.player + ' .life');
    return $playerLife;
}

export function renderHp() {
    this.elHp().style.width = this.hp + '%';
}