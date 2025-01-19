const content = document.querySelector('#content');
const head = document.querySelector('head');
const body = document.querySelector('body');


let currPage = 'home'

if(window.location.pathname !== '/'){
    currPage = window.location.pathname.split('/')[1];
    console.log(currPage)
}

let pageStates = new Map();
function addPage(page, state){
    pageStates.set(page, state);
}

let clickEventEmitters = new Map();
let keydownEventEmitters = new Map();

function addEvents(funcs){
    for(const func of funcs){
        const [event, element] = func.name.split(/_(.*)/).slice(0, 2);
        if(event === 'keydown') {
            keydownEventEmitters.set(element, func);
        }else if(event === 'click'){
            clickEventEmitters.set(element, func);
        }
    }
}

function addComponent(templateId, contentProps={}, styleProps={}){
    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);
    template.parentNode.appendChild(clone);

}

const click_home_btn = () => {
    loadPage('home').then(
        r => r ? console.log('Page loaded') : console.log('Page not loaded')
    );
}



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

window.addEventListener('popstate', (event) => {
    const page = window.location.pathname.split('/')[1];
    loadPage(page).then(r => {
        if(r){
            console.log('Page loaded');
        }else {
            console.log('Page not loaded');
        }
    })
})

async function loadPage(page) {
    currPage = page;
    history.pushState(null,'',`/${page}`);
    const path = `app/${page}/${page}`;
    const finalPath = path + '.html';
    const pageFile = await fetch(finalPath);
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

loadPage(currPage).then(r =>{
    if (r) {
        console.log('Page loaded');
    }else {
        console.log('Page not loaded');
    }
}
);

addEvents([click_home_btn])


const state = {}