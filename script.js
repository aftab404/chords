const content = document.querySelector('#content');
const head = document.querySelector('head');
const body = document.querySelector('body');

if(localStorage.getItem('currPage') === null){
    localStorage.setItem('currPage', 'home');
}

let pageStates = new Map();
function addPageState(page, state){
    pageStates.set(page, state);
}
let clickEventEmitters = new Map();
let keydownEventEmitters = new Map();

function addEventEmitter(func){
    const [event, element] = func.name.split(/_(.*)/).slice(0, 2);
    if(event === 'keydown') {
        keydownEventEmitters.set(element, func);
    }else if(event === 'click'){
        clickEventEmitters.set(element, func);
    }
}

const click_home_btn = (rerender = false) => {
    if(!rerender){
        loadPage('home').then(
            r => r ? console.log('Page loaded') : console.log('Page not loaded')
        );
    }
}

addEventEmitter(click_home_btn)


body.addEventListener('click', (event) => {
    if(clickEventEmitters.has(event.target.id)){
        clickEventEmitters.get(event.target.id)();
    }
} )

body.addEventListener('keydown', (event) => {
    if(keydownEventEmitters.has(event.target.id)){
        keydownEventEmitters.get(event.target.id)(event);
    }
})

function rerender(page){
    if(pageStates.has(page)) {
        const pageState = pageStates.get(page);
        Object.values(pageState).forEach(methods => {
            const { set } = methods;
            set();
        })
    }
}

async function loadPage(page) {
    localStorage.setItem('currPage', page);
    const path = `${page}/${page}`;
    const pageFile = await fetch(path + '.html');
    content.innerHTML = await pageFile.text();

    if(body.children.length > 1){
        body.removeChild(body.lastChild);
    }
    if(head.children.length > 1){
        head.removeChild(head.lastChild);
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path + '.style.css';
    head.appendChild(link);

    const script = document.createElement('script');
    script.src = path + `.script.js?cacheBust=${Date.now()}`;
    script.type = 'module';
    body.appendChild(script);

    rerender(page)

    return true;

}

loadPage(localStorage.getItem("currPage")).then(r =>{
    if (r) {
        console.log('Page loaded');
    }else {
        console.log('Page not loaded');
    }
}
);


const state = {}

fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>console.log(json))