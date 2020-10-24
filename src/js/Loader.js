import {createElement, getRandomColor} from "./utils";

const DefaultLoaderConfig = {
    itemsCount: 4,
    itemColors: [],
    animationDuration: 1
};

export default class Loader {
    constructor(parent, config = {}) {
        this._config = {
            ...DefaultLoaderConfig,
            ...config
        };
        this._element = createElement({
            tag: 'div',
            classes: 'loader hidden',
            parent
        });
        this._generateMarkup();
    }

    show() {
        this._element.classList.remove('hidden');
    }

    hide() {
        this._element.classList.add('hidden');
    }

    _generateMarkup() {
        const { itemsCount, itemColors, animationDuration } = this._config;

        for (let i = 0; i < itemsCount; i++) {
            const loaderElement = createElement({
                tag: 'span',
                parent: this._element,
                classes: 'loader-circle'
            });
            loaderElement.style.backgroundColor = itemColors[i] || getRandomColor();
            loaderElement.style.animationDelay = `${((animationDuration / itemsCount) * i)}s`;
        }
    }
}