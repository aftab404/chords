const notebook = {
  showCard: {
    init: (showCard) => {
      state.showCard = state.showCard || showCard;  
    },
    get: () => state.showCard,
    set: (showCard = state.showCard) => {
      state.showCard = showCard;
    },
  },
};

const { showCard } = notebook;

showCard.init(false);

const sampleData = {
  chords: [
    {
      name: "C",
      notes: ["C", "E", "G"],
    },
    {
      name: "D",
      notes: ["D", "F#", "A"],
    },
    {
      name: "E",
      notes: ["E", "G#", "B"],
    },
  ],
};

// sampleData.chords.forEach(chord => {
//     addComponent("chord_template", chord, ["name_padding_4px", "name_margin_2px", "name_border_solid"])
// })

const click_add_chord_btn = () => {
  addComponent("chord_template");
};

addEvents([click_add_chord_btn]);

addPage("notebook", notebook);
