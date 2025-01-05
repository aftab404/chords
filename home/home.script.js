const practiceBtn = () => {
    loadPage('practice').then(
        r => r ? console.log('Page loaded') : console.log('Page not loaded')
    );
}

const notebookBtn = () => {
    loadPage('notebook').then(
        r => r ? console.log('Page loaded') : console.log('Page not loaded')
    );
}

addEventEmitter(practiceBtn);
addEventEmitter(notebookBtn);


