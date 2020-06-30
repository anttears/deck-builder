const getcardFromCardList = (uuid, cardList) => {
    return cardList.find(card => card.uuid === uuid);
}

const getDeckNumber = value => {
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
    const deckInfo = deck[uuid] || { cardName: card.name, uuid, number: null };
    const number = getDeckNumber(deckInfo.number);

    return {
        ...deckInfo,
        number
    }
};


export { addCard };