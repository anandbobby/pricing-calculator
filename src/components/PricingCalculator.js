import React, { useState } from 'react';
import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, HStack, Container, extendTheme, ChakraProvider } from '@chakra-ui/react';

const pricingData = [
  { range: '1-50', cost: '₹500' },
  { range: '51-100', cost: '₹350' },
  { range: '101-250', cost: '₹250' },
  { range: '251-500', cost: '₹200' },
  { range: '501-1000', cost: '₹150' },
  { range: '1000+', cost: '₹100' }
];

const theme = extendTheme({
  colors: {
    brand: {
      500: "#ff6752",
    },
  },
});

const backgroundStyle = {
  backgroundColor: '#e5e5f7',
  opacity: 0.8,
  backgroundImage: 'radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)',
  backgroundSize: '10px 10px',
};

const PricingCalculator = () => {
  const [userCount, setUserCount] = useState('');
  const [totalCost, setTotalCost] = useState(null);
  const [breakdown, setBreakdown] = useState('');
  const [showPricing, setShowPricing] = useState(false);

  const calculatePrice = () => {
    if (!userCount || userCount <= 0) {
      setTotalCost(null);
      setBreakdown('Please enter a valid number of users.');
      return;
    }
    let cost = 0;
    if (userCount <= 50) cost = 500;
    else if (userCount <= 100) cost = 350;
    else if (userCount <= 250) cost = 250;
    else if (userCount <= 500) cost = 200;
    else if (userCount <= 1000) cost = 150;
    else cost = 100;

    setTotalCost(userCount * cost);
    setBreakdown(`${userCount} users at ₹${cost} each`);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box style={backgroundStyle} minHeight="100vh">
        <Container maxW="container.md" py={10}>
          <VStack spacing={8} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">Pricing Calculator</Text>
            
            <VStack spacing={4}>
              <Text fontSize="lg">Enter number of users:</Text>
              <HStack>
                <Input
                  type="number"
                  value={userCount}
                  onChange={(e) => setUserCount(e.target.value)}
                  placeholder="Enter users"
                  maxWidth="200px"
                />
                <Button onClick={calculatePrice} colorScheme="brand">
                  Calculate Fee
                </Button>
              </HStack>
            </VStack>

            {totalCost !== null && (
              <Box bg="gray.100" p={4} borderRadius="md">
                <Text fontSize="xl" fontWeight="bold">
                  Total Fee: ₹ {totalCost.toLocaleString()}
                </Text>
                <Text>({breakdown})</Text>
              </Box>
            )}

            <Button onClick={() => setShowPricing(!showPricing)} colorScheme="brand">
              {showPricing ? 'Hide Volume Pricing' : 'Show Volume Pricing'}
            </Button>

            {showPricing && (
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Users</Th>
                      <Th>Cost (₹)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pricingData.map((row) => (
                      <Tr key={row.range}>
                        <Td>{row.range}</Td>
                        <Td>{row.cost.toLocaleString()}/user</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default PricingCalculator;
