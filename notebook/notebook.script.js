const openBtn_click = () => {
    const title = document.getElementById('title');
    console.log('Open button clicked');
    title.innerHTML = "Open";
}

addEventEmitter(openBtn_click);