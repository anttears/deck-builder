import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Box,
    Grid,
    Stack,
    Text,
    IconButton
} from "@chakra-ui/core";
import { BsCircleFill, BsCardList } from 'react-icons/bs';
import { FaPlusCircle, FaMinusCircle, FaLandmark } from 'react-icons/fa';

import { COLOUR_CLASS } from '../../enums/colours';
import { addCard, removeCard } from '../../actions/deck';


class Cards extends Component {
    constructor(props) {
        super(props);
        this.getCardsFromSet.bind(this);
        this.processColours.bind(this);
        this.processLands.bind(this);
        this.getLandCard.bind(this);
        this.getColourCard.bind(this);
        this.convertManaToSymbol.bind(this);
        this.getAddRemoveButtons.bind(this);
        this.addRemoveCard.bind(this);
    }

    getCardsFromSet = () => {
        const sortedCards = this.props.cards.sortedCards;

        if (sortedCards.land) {
            return(<Accordion allowMultiple>
                { 
                    Object.entries(sortedCards).map(([identity, cardSubset]) => {
                        if (identity === 'land') {
                            return this.processLands(cardSubset);
                        }
                        return this.processColours(cardSubset)
                    })
                }
            </Accordion>
            )
        }

        return (
            <Text p="3">No cards to display as no set chosen</Text>
        )
    }

    /**
     * Playing cards
     */

    processColours = (cardSubset) => {
        const cardList = cardSubset.cards.map(card => this.getColourCard(card));

        return (
            <AccordionItem>
                <AccordionHeader>
                    <Box flex="1" textAlign="left">
                        <Stack isInline>                
                            <Box as={BsCardList} mt="1"/>
                            <Text textShadow="1px 1px #ccc">{ cardSubset.colourTitle }</Text>
                        </Stack>
                    </Box>
                    <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    { cardList } 
                </Grid>
                </AccordionPanel>
            </AccordionItem>
        )
    }

    getColourCard = card => {
        const mana = card.manaCost.map(colour => {
            return this.convertManaToSymbol(colour);
        });

        const abilities = card.abilities ? card.abilities.map(ability => <p>{ ability }</p>) : null;
        const power = <Text>{ `${card.power || '-'} / ${card.toughness || '-'}` }</Text>;  
        const subType = card.subTypes.length ? `${card.subTypes.join(' ')} -` : '';
        const type = `${subType} ${card.types.join(' ')}`;  
        const add = this.getAddRemoveButtons(card.uuid);

        return(
            <Box w="100%" d="flex" flexDirection="column" border="1px" borderRadius="md" borderColor="gray.400">
                <Box fontSize="sm" d="flex" p={2} borderBottom="1px" bg="gray.300" borderColor="gray.400">
                    <Box flexGrow="1">{ card.name }</Box> <Stack isInline>{ mana }</Stack>
                </Box>
                <Box p={2} fontSize="sm" border-bottom="1px" bg="gray.300" borderColor="gray.500">{ type }</Box>
                <Box p={2} fontSize="sm" border-bottom="1px" borderColor="gray.400" bg="gray.200">{ abilities }</Box>
                <Box p={2} flexGrow="1" fontSize="xs" border-bottom="1px" borderColor="gray.400" bg="gray.200">{ card.flavorText }</Box>
                <Box bg="gray.300" d="flex" p={2}>
                    <Box flexGrow="1">{ power }</Box><Box>{ add }</Box>
                </Box>
            </Box>
        );
    }

    /**
     * Lands - TODO change data structure to just render a card
     */

    processLands = cardSubset => {
        const cardList = cardSubset.map(card => this.getLandCard(card));
        
        return (
            <AccordionItem>
                <AccordionHeader>
                    <Box flex="1" textAlign="left">
                        <Stack isInline>                
                            <Box as={FaLandmark} mt="1"/>
                            <Text textShadow="1px 1px #ccc">Land</Text>
                        </Stack>
                    </Box>
                    <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    { cardList } 
                </Grid>
                </AccordionPanel>
            </AccordionItem>          
        )
    }

    getLandCard = card => {
        const mana = card.colorIdentity.map(color => {
            return this.convertManaToSymbol(color);
        });

        const abilities = card.abilities.map((ability, i) => <p key={ `ability_${i}` }>{ ability }</p>);
        const add = this.getAddRemoveButtons(card.uuid);

        return(
            <Box w="100%" d="flex" flexDirection="column" border="1px" borderRadius="md" borderColor="gray.400">
                <Box fontSize="sm" d="flex" p={2} borderBottom="1px" bg="gray.300" borderColor="gray.400">
                    <Box flexGrow="1">{ card.name }</Box> <Stack isInline alignItems="right">{ mana }</Stack>
                </Box>
                <Box p={2} fontSize="sm" border-bottom="1px" borderColor="gray.400" bg="gray.200">{ abilities }</Box>
                <Box p={2} flexGrow="1" fontSize="xs" border-bottom="1px" borderColor="gray.400" bg="gray.200">{ card.flavorText }</Box>
                <Box bg="gray.300" p={2}>{ add }</Box>
            </Box>
        );
    }

    /**
     * Helpers
     */

    convertManaToSymbol = colour => {
        const isInt = Number.isInteger(colour);
        const colourValue = isInt ? '' : `${COLOUR_CLASS[colour]}`;
        const value = isInt ? colour : '';
        let box = <Box as={BsCircleFill} mt={1} color={ colourValue } />;
        if (isInt) {
            box = <Box color={ colourValue }>{ value }</Box>
        }

        return box;
    }

    getAddRemoveButtons = uuid => {
        return (
            <Box d="flex" flexDirection="row" justifyContent="flex-end" fontSize="lg">
                <IconButton aria-label="Add card" variant="outline" variantColor="black" size="sm" icon={FaPlusCircle} mr={1} data-uuid={ uuid } data-type="add" onClick={ this.addRemoveCard }/>
                <IconButton aria-label="Remove card" variant="outline" variantColor="black" size="sm" icon={FaMinusCircle} mr={1} data-uuid={ uuid } data-type="remove" onClick={ this.addRemoveCard }/>
            </Box>
        );
    }
    
    /**
     * Functionality
     */

    addRemoveCard = e => {
        const dataset = e.target.dataset;
        if (dataset.type === 'add') {
            this.props.addCard(dataset.uuid, this.props.cards.cardList);
        } else if (dataset.type === 'remove') {
            this.props.removeCard(dataset.uuid, this.props.cards.cardList);    
        }
    }

    /**
     * Render
     */

    render() {
        return(
            <>
                { this.getCardsFromSet() }
            </>
        )
    };
};

const mapStateToProps = state => ({
    cards: state.cards,
    deck: state.deck
});

export default connect(mapStateToProps, { addCard, removeCard })(Cards);