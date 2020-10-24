(()=>{"use strict";function e(e){const{tag:t,parent:s=document.body,classes:n="",content:o=""}=e,r=document.createElement(t);return r.classList.add(...n.split(" ")),r.innerHTML=o,s.appendChild(r),r}const t={itemsCount:4,itemColors:[],animationDuration:1};class s{constructor(s,n={}){this._config={...t,...n},this._element=e({tag:"div",classes:"loader hidden",parent:s}),this._generateMarkup()}show(){this._element.classList.remove("hidden")}hide(){this._element.classList.add("hidden")}_generateMarkup(){const{itemsCount:t,itemColors:s,animationDuration:n}=this._config;for(let o=0;o<t;o++){const r=e({tag:"span",parent:this._element,classes:"loader-circle"});r.style.backgroundColor=s[o]||"#"+Array.from({length:6}).map((()=>"0123456789ABCDEF"[Math.floor(16*Math.random())])).join(""),r.style.animationDelay=n/t*o+"s"}}}const n="https://raw.githubusercontent.com/netology-code/ajs-task/master/netology.json";new class{constructor(e){if(this._element=document.querySelector(e),!this._element)throw new Error("Can't inititalize app! No element with selector "+e);this._loader=new s(this._element)}async render(){this._loader.show(),await this._renderCourses(),this._loader.hide()}async _renderCourses(){const{data:t}=await this._requestData(n),s=e({tag:"section",parent:this._element,classes:"section courses",content:'<h2 class="section-heading">Изучайте <strong class="text-color-alt">актуальные темы</strong></h2>'}),o=e({tag:"ul",parent:s,classes:"courses-list"});for(let e of t)this._renderCourseItem(e,o)}_renderCourseItem(e,t){const{direction:{title:s,link:n},groups:o}=e,r=`\n            <li class="courses-list-item">\n                <div class="courses-list-item-info">\n                    <a class="courses-list-item-link" href="${n}">${s}</a>\n                    <p class="courses-list-item-desc">${o.reduce(((e,t)=>e+t.items.length),0)} курсов</p>\n                </div>\n                <div class="courses-list-item-decor"></div>\n            </li>`;t.insertAdjacentHTML("beforeend",r)}async _requestData(e){const t=await fetch(e);if(!t.ok)throw new Error("Can't get data from "+e);return t.json()}}("#root").render()})();