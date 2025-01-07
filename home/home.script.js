const practiceBtn_click = () => {
    loadPage('practice').then(
        r => r ? console.log('Page loaded') : console.log('Page not loaded')
    );
}

const notebookBtn_click = () => {
    loadPage('notebook').then(
        r => r ? console.log('Page loaded') : console.log('Page not loaded')
    );
}


addEventEmitter(practiceBtn_click);
addEventEmitter(notebookBtn_click);


