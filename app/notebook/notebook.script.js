const notebook = {
    isOpened: {
        init : (val) => { state.isOpened = state.isOpened || val },
        get : () => state.isOpened,
        set : (isOpened = state.isOpened) => {
            state.isOpened = isOpened;
            const isOpenedElem = document.getElementById('title');
            isOpenedElem.innerHTML = state.isOpened;
        }
    }
}

const { isOpened } = notebook;

isOpened.init(false);

const click_open_btn = () => {
    isOpened.set(!isOpened.get());
}

addEventEmitter(click_open_btn);

pageStates.set('notebook', notebook);