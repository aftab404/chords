const notebook = {}

const click_add_chord_btn = () => {
    addComponent('chord_template');
}

addEvents([
    click_add_chord_btn
])

addPage("notebook", notebook);