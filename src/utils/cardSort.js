import { COLUMN_ENUM } from '../enums/colours';

const getColourIdentity = card => {
    const colourIdentity = {
        id: '',
        title: ''
    }

    colourIdentity.id = card.colorIdentity.join('');
    colourIdentity.title = card.colorIdentity.map(colourCode => COLUMN_ENUM[colourCode]).join(' ');

    return colourIdentity;
};


const cardSort = cards => {
    const sortedCards = {
        land: []
    };
    cards.forEach(card => {
        if (card.types.includes('Land')) {
            sortedCards.land.push(card);
            return;   
        }
        const colourIdentity = getColourIdentity(card);
        if (!sortedCards[colourIdentity.id]) {
            sortedCards[colourIdentity.id] = {
                colourTitle: colourIdentity.title,
                cards: [card]
            }   
            return 
        }
        sortedCards[colourIdentity.id].cards.push(card);
    });

    return sortedCards;
}

export default cardSort;