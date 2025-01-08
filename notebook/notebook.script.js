const click_open_btn = () => {
    const title = document.getElementById('title');
    console.log('Open button clicked');
    title.innerHTML = "Open";
}

addEventEmitter(click_open_btn);