import React from 'react';
import { Provider } from 'react-redux';
import { Box, Heading, Stack, Text, Grid } from "@chakra-ui/core";
import { FaDiceD20 } from 'react-icons/fa';

import './app.css';

import store from './store';
import Sets from './components/sets/Sets';
import Cards from './components/cards/Cards';
import Deck from './components/deck/Deck';

const App = () => {
    return (
        <Provider store={store}>
            <>
                <Box bg="gray.600" w="100%" p={4} color="white" borderBottom="1px" borderColor="gray.700">
                    <Heading as="h1" size="2xl">
                        <Stack isInline>
                            <Box as={FaDiceD20} mt="2"/>
                            <Text textShadow="1px 1px #333">Deck Builder</Text>
                        </Stack>
                    </Heading>
                </Box>
                <Grid templateColumns="repeat(1, 1fr 3fr 1fr)" gap={6} bg="gray.200">
                    <Box w="100%" as={Sets} />
                    <Box w="100%" as={Cards} />
                    <Box w="100%" as={Deck} />
                </Grid>
            </>
        </Provider>
    ) ;
};

export default App;
