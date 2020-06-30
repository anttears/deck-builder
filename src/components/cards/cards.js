import React, {Component} from 'react';
import { connect } from 'react-redux';
import unescape from 'lodash.unescape';

import { COLOUR_CLASS } from '../../enums/colours';
import { addCard, removeCard } from '../../actions/deck';

import './cards.css';

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
        this.toggleCardList.bind(this);
    }

    getCardsFromSet = () => {
        const sortedCards = this.props.cards.sortedCards;

        if (sortedCards.land) {
            return Object.entries(sortedCards).map(([identity, cardSubset]) => {
                if (identity === 'land') {
                    return this.processLands(cardSubset);
                }
                return this.processColours(cardSubset)
            });
        }

        return (
            <p>No cards to display as no set chosen</p>
        )
    }

    processColours = (cardSubset) => {
        const cardList = cardSubset.cards.map(card => this.getColourCard(card));

        return (
            <div className="cards">
                <h2 className="is-clearfix">
                    <span className="icon">
                        <i className="fas fa-address-card" aria-hidden="true"></i>
                    </span>
                    <span>{ cardSubset.colourTitle }</span>
                    <span className="icon is-pulled-right" onClick={ this.toggleCardList }>
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </h2>
                <div className="card-list">
                    <div className="flex-row">
                        { cardList }   
                    </div>
                </div>
            </div>
        )
    }

    getColourCard = card => {
        const mana = card.manaCost.map(colour => {
            return this.convertManaToSymbol(colour);
        });

        const abilities = card.abilities ? card.abilities.map(ability => <p>{ unescape(ability) }</p>) : null;
        const power = card.power === null ? '' : <span className="tag is-dark is-pulled-right">{ `${card.power} / ${card.toughness}` }</span>;  
        const subType = card.subTypes.length ? `- ${card.subTypes.join(' ')}` : '';
        const type = `${card.types.join(' ')} ${subType}`;  
        const add = this.getAddRemoveButtons(card.uuid);

        return(
            <div className="tile is-parent is-3">
                <article className="message card">
                    <div className="message-header">
                        <p className="card-name is-clearfix"><span className="icons is-pulled-right">{ mana }</span> <span>{ unescape(card.name) }</span></p>
                    </div>
                    <div className="message-body">
                        <p className="card-type">{ type }</p>
                        { abilities }
                        <p className="flavour-text">{ unescape(card.flavorText) }</p>
                    </div>
                    <div className="message-footer is-clearfix">
                        { power }  
                        { add }
                    </div>
                </article>
            </div>
        );
    }

    convertManaToSymbol = colour => {
        const isInt = Number.isInteger(colour);
        const cls = isInt ? `${COLOUR_CLASS['N']}` : `fas fa-circle ${COLOUR_CLASS[colour]}`;
        const value = isInt ? colour : '';

        return (
            <span className={ `icon mana` }>
                <i className={ cls } aria-hidden="true">{ value }</i>
            </span> 
        );
    }

    getAddRemoveButtons = uuid => {
        return (
            <div className="card-buttons">
                <span className={ `icon buttons` }>
                    <i data-uuid={uuid} data-type="remove" className="fas fa-minus-circle" onClick={ this.addRemoveCard } aria-hidden="true"></i>
                </span>
                <span className={ `icon buttons` }>
                    <i className="fas fa-plus-circle" onClick={ this.addRemoveCard } data-uuid={uuid} data-type="add" aria-hidden="true"></i>
                </span>       
            </div>
        );
    }

    getLandCard = card => {
        const mana = card.colorIdentity.map(color => {
            return this.convertManaToSymbol(color);
        });

        const abilities = card.abilities.map((ability, i) => <p key={ `unescape(ability)_${i}` }>{ unescape(ability) }</p>);

        return(
            <div className="tile is-parent is-3">
                <article className="message card">
                    <div className="message-header ">
                        <p><span className="icons">{ mana }</span> <span>{ unescape(card.name) }</span></p>
                    </div>
                    <div className="message-body">
                        { abilities }
                        <p className="flavour-text">{ unescape(card.flavorText) }</p>
                    </div>
                </article>
            </div>
        );
    }

    processLands = cardSubset => {
        const cardList = cardSubset.map(card => this.getLandCard(card));

        return (
            <div className="cards">
                <h2 className="is-clearfix">
                    <span className="icon">
                        <i className="fas fa-landmark" aria-hidden="true"></i>
                    </span>
                    <span>Land</span>
                    <span className="icon is-pulled-right" onClick={ this.toggleCardList }>
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </h2>
                <div className="card-list">
                    <div className="flex-row">
                        { cardList }   
                    </div>
                </div>
            </div>           
        )
    }

    addRemoveCard = e => {
        const dataset = e.target.dataset;
        if (dataset.type === 'add') {
            this.props.addCard(dataset.uuid, this.props.cards.cardList);
        } else {
            this.props.removeCard(dataset.uuid, this.props.cards.cardList);    
        }
    }

    toggleCardList = e => {
        let parent = e.target.parentNode;
        while (parent.parentNode) {
            if (parent.classList.contains('cards')) {
                const cardList = parent.getElementsByClassName('card-list')[0];
                if (cardList.classList.contains('hide')) {
                    cardList.classList.remove('hide');
                    e.target.classList.add('fa-angle-down');
                    e.target.classList.remove('fa-angle-up');
                } else {
                    cardList.classList.add('hide');  
                    e.target.classList.remove('fa-angle-down');
                    e.target.classList.add('fa-angle-up');  
                }
                break;
            } else {
                parent = parent.parentNode;
            }
        }
    }

    render() {
        return(
            <div className="card-list">
                { this.getCardsFromSet() }
            </div>
        )
    };
};

const mapStateToProps = state => ({
    cards: state.cards,
    deck: state.deck
});

export default connect(mapStateToProps, { addCard, removeCard })(Cards);