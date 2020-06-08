import React, {Component} from 'react';
import './cards.css';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNames: []
        } 
    }

    async componentDidMount() {
        const response = await fetch('/api/card-names');
        const cardNames = await response.json();
        this.setState({cardNames});
    }

    render() {
        return(
            <div>
            <h2>Cards</h2>
            <ul>
                { this.state.cardNames.map(cardName => <li key={cardName}>{cardName}</li>) }   
            </ul>
            </div>
        )
    };
};

export default Cards;