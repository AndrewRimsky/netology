export function createElement(config) {
    const {tag, parent = document.body, classes = '', content = ''} = config;
    const element = document.createElement(tag);
    element.classList.add(...classes.split(' '));
    element.innerHTML = content;
    parent.appendChild(element);
    return element;
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    return `#${Array.from({length: 6}).map(() => letters[Math.floor(Math.random() * 16)]).join('')}`;
}