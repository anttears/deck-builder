import React, {Component} from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListIcon, Link } from "@chakra-ui/core";
import { MdWebAsset } from 'react-icons/md';


import { fetchSets, fetchCards } from '../../actions/fetch';
import { setName } from '../../actions/set';

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
        const setName = e.target.dataset.setName;
        this.props.setName(setName);
        this.props.fetchCards(setName);
    }

    getSetList = () => {
        if (this.props.sets.setList.length) {
            const currentSetName = this.props.sets.currentSetName;
            return (this.props.sets.setList.map(set => {

                const bgColour = set.name === currentSetName ? 'gray.200' : null;

                return (
                    <ListItem py={3} borderBottom="1px" borderColor="gray.300" key={ set._id } bg={ bgColour }>
                        <ListIcon as={ MdWebAsset } ml={3}/>
                        <Link data-set-name={ set.name } onClick={ this.onSelected }>{ set.name }</Link>
                    </ListItem>
                )
            }));
        }
        
        return <ListItem borderBottom="1px" borderColor="gray.200" p={3}>No Sets available</ListItem>
    };

    render() {
        return(
            <List bg="gray.400">
                { this.getSetList() }
            </List>
        )
    };
};

const mapStateToProps = state => ({
    sets: state.sets
});

export default connect(mapStateToProps, { fetchSets, setName, fetchCards })(Sets);
