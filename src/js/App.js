import Loader from "./Loader";
import {createElement} from "./utils";

const DataUrlMap = {
    courses: 'https://raw.githubusercontent.com/netology-code/ajs-task/master/netology.json'
};

export default class App {
    constructor(elementSelector) {
        this._element = document.querySelector(elementSelector);

        if (!this._element) {
            throw new Error(`Can't inititalize app! No element with selector ${elementSelector}`)
        }

        this._loader = new Loader(this._element);
    }

    async render() {
        this._loader.show();
        await this._renderCourses();
        this._loader.hide();
    }

    async _renderCourses() {
        const {data: coursesData} = await this._requestData(DataUrlMap.courses);

        const wrapper = createElement({
            tag: 'section',
            parent: this._element,
            classes: 'section courses',
            content: `<h2 class="section-heading">Изучайте <strong class="text-color-alt">актуальные темы</strong></h2>`
        });

        const coursesList = createElement({
            tag: 'ul',
            parent: wrapper,
            classes: 'courses-list'
        });

        for (let course of coursesData) {
            this._renderCourseItem(course, coursesList);
        }
    }

    _renderCourseItem(course, parent) {
        const { direction: { title, link }, groups } = course;
        const coursesCount = groups.reduce((count, group) => count += group.items.length, 0);

        const markup = `
            <li class="courses-list-item">
                <div class="courses-list-item-info">
                    <a class="courses-list-item-link" href="${link}">${title}</a>
                    <p class="courses-list-item-desc">${coursesCount} курсов</p>
                </div>
                <div class="courses-list-item-decor"></div>
            </li>`
        ;

        parent.insertAdjacentHTML('beforeend', markup);
    }

    async _requestData(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Can't get data from ${url}`);
        }

        return response.json();
    }
}