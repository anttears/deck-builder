const getcardFromCardList = (uuid, cardList) => {
    return cardList.find(card => card.uuid === uuid);
}

const increaseDeckNumber = (value, card) => {
    const isLand = card.types.includes('Land');
    const isRareLand = isLand && card.rarity === 'rare'; // TODO enum with rarity and number so can use `>=` for rare or higher

    if (isLand && !isRareLand) {
        return value + 1;
    }

    if (value && value > 3) {
        return 4;
    }

    if (value && value < 4) {
        return value + 1;
    }

    return 1;
}

const addCard = ({uuid, cardList}, deck) => {
    const card = getcardFromCardList(uuid, cardList);
    const deckInfo = deck[uuid] || { 
        cardName: card.name, 
        uuid, 
        number: null,
        type: card.types.join(' '),
        convertedManaCost: card.convertedManaCost 
    };
    const number = increaseDeckNumber(deckInfo.number, card);

    return {
        ...deck,
        [uuid]: {
            ...deckInfo,
            number
        }
    }
};

const removeCard = ({uuid, cardList}, deck) => {
    const deckInfo = deck[uuid];
    if (!deckInfo) {
        return {
            ...deck
        }
    }

    if (deckInfo.number === 1) {
        return Object.keys(deck).reduce((newDeck, key) => {
            if (key !== uuid) {
                newDeck[key] = deck[key]
            }
            return newDeck
        }, {})
    }
    
    return {
        ...deck,
        [uuid]: {
            ...deckInfo,
            number: deckInfo.number - 1
        }
    }
};


export { addCard, removeCard };