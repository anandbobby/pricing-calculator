import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import PricingCalculator from './components/PricingCalculator';

function App() {
  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl">
        <PricingCalculator />
      </Box>
    </ChakraProvider>
  );
}

export default App;
