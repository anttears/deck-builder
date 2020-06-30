import React, {Component} from 'react';
import { connect } from 'react-redux';
import unescape from 'lodash.unescape';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.getDeckItem.bind(this);
    }

    getDeckItem = deckInfo => {
        return (
            <div class="tags has-addons">
                <span class="tag is-dark">{ unescape(deckInfo.cardName) }</span>
                <span class="tag is-success">{ deckInfo.number }</span>
            </div>
        )
    }

    render() {
        return(
            <div>
                <h2>Deck</h2>
                <div class="card-list control">
                    { Object.values(this.props.deck.cards).map(card => this.getDeckItem(card)) } 
                </div>
            </div>
        )
    };
};

const mapStateToProps = state => ({
    deck: state.deck
});

export default connect(mapStateToProps, {})(Deck);