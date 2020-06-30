import React, {Component} from 'react';
import { connect } from 'react-redux';
import unescape from 'lodash.unescape';

import { fetchSets, fetchCards } from '../../actions/fetch';
import { setName } from '../../actions/set';
import './sets.css';

class Sets extends Component {

    constructor(props) {
        super(props);
        this.getSetList.bind(this);
        this.onSelected.bind(this);
    }

    componentDidMount() {
        this.props.fetchSets();
    }

    onSelected = (e) => {
        const setName = encodeURIComponent(e.target.dataset.setName);
        this.props.setName(setName);
        this.props.fetchCards(setName);
    }

    getSetList = () => {
        if (this.props.sets.setList.length) {
            const currentSetName = decodeURIComponent(this.props.sets.currentSetName);
            return (this.props.sets.setList.map(set => {
                return (
                    <li key={ set._id } data-set-name={ set.name } onClick={ this.onSelected } className={ set.name === currentSetName ? 'panel-block is-active' : 'panel-block' }>
                        <span className="panel-icon">
                            <i className="fas fa-book" aria-hidden="true"></i>
                        </span>{ unescape(set.name) }
                    </li>)
            }));
        }
        
        return <li key="1">No Sets available</li>   
    };

    render() {
        return(
            <nav className="panel">
                <p className="panel-heading">Available Sets</p>
                <ul className="set-list">
                    { this.getSetList() }
                </ul>
            </nav>
        )
    };
};

const mapStateToProps = state => ({
    sets: state.sets
});

export default connect(mapStateToProps, { fetchSets, setName, fetchCards })(Sets);
