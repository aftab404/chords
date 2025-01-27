const home = {}

const click_practice_btn = () => {
        loadPage('practice').then(
            r => r ? console.log('Page loaded') : console.log('Page not loaded')
        );
}

const click_notebook_btn = () => {
        loadPage('notebook').then(
            r => r ? console.log('Page loaded') : console.log('Page not loaded')
        );
}

addEvents([
    click_practice_btn,
    click_notebook_btn
])


addPage("home", home);



