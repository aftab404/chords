const content = document.querySelector('#content');
const head = document.querySelector('head');
const body = document.querySelector('body');

if(localStorage.getItem('currPage') === null){
    localStorage.setItem('currPage', 'home');
}

body.addEventListener('click', (event) => {
    if(event.target.id === 'practice-btn'){
        loadPage('practice').then(
            r => r ? console.log('Page loaded') : console.log('Page not loaded')
        );
    }
    if(event.target.id === 'notebook-btn'){
        loadPage('notebook').then(
            r => r ? console.log('Page loaded') : console.log('Page not loaded')
        );
    }
    if(event.target.id === 'home-btn'){
        loadPage('home').then(
            r => r ? console.log('Page loaded') : console.log('Page not loaded')
        );
    }

} )

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
    script.src = path + '.script.js';
    script.type = 'module';
    body.appendChild(script);

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