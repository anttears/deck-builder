import React, {Component} from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListIcon, Box, Tag, IconButton } from "@chakra-ui/core";
import { RiBankCard2Line } from 'react-icons/ri';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

import { addCard, removeCard } from '../../actions/deck';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.getDeckItem.bind(this);
        this.addRemoveCard.bind(this);
    }

    getDeckItem = deckInfo => {
        return (
            <ListItem py={3} borderBottom="1px" borderColor="gray.300" key={ deckInfo.uuid } d="flex" flexDirection="row" alignItems="center">
                <Box d="flex" flexDirection="column" flexGrow="1">
                    <Box d="flex" flexDirection="row" alignItems="center">
                        <ListIcon as={ RiBankCard2Line } ml={3} d="flex"/>
                        <Box flexGrow="1">{ deckInfo.cardName }</Box>
                    </Box>
                    <Box d="flex" flexDirection="row" alignItems="center" px={3} fontSize="sm">
                        <Box mr="3" ml="6">{ deckInfo.type }</Box>
                        <Box>{ `mana cost: ${deckInfo.convertedManaCost}` }</Box>
                    </Box>
                </Box>
                

                <Box d="flex" flexDirection="row" alignItems="center">
                    <Tag border="1px" bg="grey.400" borderColor="gray.600" mr={3}>{ deckInfo.number }</Tag>
                    <IconButton aria-label="Add card" variant="outline" variantColor="black" size="sm" icon={FaPlusCircle} mr={1} data-uuid={ deckInfo.uuid } data-type="add" onClick={ this.addRemoveCard }/>
                    <IconButton aria-label="Remove card" variant="outline" variantColor="black" size="sm" icon={FaMinusCircle} mr={1} data-uuid={ deckInfo.uuid } data-type="remove" onClick={ this.addRemoveCard }/>
                </Box>
            </ListItem>
        )
    }

    /**
     * Functionality - TODO, figure a give way to share functionality - probably it's own cmp...
     */

    addRemoveCard = e => {
        const dataset = e.target.dataset;
        if (dataset.type === 'add') {
            this.props.addCard(dataset.uuid, this.props.cards.cardList);
        } else if (dataset.type === 'remove') {
            this.props.removeCard(dataset.uuid, this.props.cards.cardList);    
        }
    }

    render() {
        return(
            <List bg="gray.500">
                { Object.values(this.props.deck.cards).map(card => this.getDeckItem(card)) } 
            </List>
        )
    };
};

const mapStateToProps = state => ({
    cards: state.cards,
    deck: state.deck
});

export default connect(mapStateToProps, { addCard, removeCard })(Deck);