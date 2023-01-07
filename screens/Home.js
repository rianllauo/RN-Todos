import React from "react";
import { Box, Image, Text, Button, Flex, Spacer } from "native-base";

const Home = ({ navigation }) => {
    return (
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
            <Image
                source={require("../assets/icons/welcome.png")}
                alt="Welcome"
                size="2xl"
            />
            <Text fontSize="3xl" fontWeight="bold">
                Ways
                <Text color="#B82020"> To</Text>
                <Text color="#FF5555">DO</Text>
            </Text>

            <Text textAlign="center" maxW="2/3">
                Write your activity and finish your activity. Fast, Simple and
                Easy to Use
            </Text>

            <Flex paddingTop="40" width="full" paddingX="10">
                <Button
                    onPress={() => navigation.navigate("Login")}
                    bgColor="#FF5555"
                    marginBottom="2"
                >
                    <Text fontWeight="bold" fontSize="md" color="white">
                        Login
                    </Text>
                </Button>
                <Spacer />
                <Button bgColor="gray.500">
                    <Text
                        onPress={() => navigation.navigate("Register")}
                        fontWeight="bold"
                        fontSize="sm"
                        color="white"
                    >
                        Register
                    </Text>
                </Button>
            </Flex>
        </Box>
    );
};

export default Home;
