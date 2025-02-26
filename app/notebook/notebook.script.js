const notebook = {
  showCard: {
    init: (showCard) => {
      state.showCard = state.showCard || showCard;  
    },
    get: () => state.showCard,
    set: (showCard = state.showCard) => {
      const stateDisplay = document.getElementById("show_card_display");
      state.showCard = showCard;
      stateDisplay.textContent = state.showCard ? "true" : "false";
    },
  },
  chords: {
    init: (chords) => {
      state.chords = state.chords || chords;
    },
    get: () => state.chords,
    set: (chord) => {
      state.chords.push(chord);
    },
  },
};




const { showCard, chords} = notebook;

chords.init([]);
showCard.init(false);



  const c = [
    {
      title: "C",
      content: "C major chord",
    },
    {
      title: "D",
      content: "D major chord",
    },
    {
      title: "E",
      content: "E major chord",
    }
  ]


  for(const chord of c){
    chords.set(chord);
  }
// sampleData.chords.forEach(chord => {
//     addComponent("chord_template", chord, ["name_padding_4px", "name_margin_2px", "name_border_solid"])
// })

const click_add_chord_btn = () => {
  addComponent("chord_template");
};

const click_show_card_btn = () => {
    showCard.set(!showCard.get());
    }

addEvents([click_add_chord_btn, click_show_card_btn]);

addPage("notebook", notebook);
