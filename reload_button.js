import {createElement} from "./element_creation.js";
import {$arena} from "./selectors.js";

export function createReloadButton() {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', () => {
        window.location.reload();
    })
    $reloadButtonDiv.appendChild($reloadButton);
    $arena.appendChild($reloadButtonDiv);
}