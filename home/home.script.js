const practiceBtn = document.getElementById('practice-btn');
const notebookBtn = document.getElementById('notebook-btn');

practiceBtn.addEventListener('click', () => {
    loadPage('practice').then(
        r => r ? console.log('Page loaded') : console.log('Page not loaded')
    );
})

notebookBtn.addEventListener('click', () => {
    loadPage('notebook').then(
        r => r ? console.log('Page loaded') : console.log('Page not loaded')
    );
})
