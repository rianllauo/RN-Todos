import {
    Badge,
    Box,
    Flex,
    HStack,
    Spacer,
    Pressable,
    Text,
    Checkbox,
    VStack,
    FlatList,
    ScrollView,
} from "native-base";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const CardTodo = ({ data }) => {
    return (
        <Box>
            <Pressable
                onPress={() => console.log("I'm Pressed")}
                rounded="8"
                overflow="hidden"
                marginBottom={3}
                maxW="96"
                bg="blue.100"
                p="5"
            >
                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"space-between"}
                >
                    <Text fontSize={"xl"} fontWeight="bold">
                        {data.title}
                    </Text>
                    <Badge bg={"red.500"} borderRadius="md">
                        <Text color="white" fontWeight={"medium"}>
                            Study
                        </Text>
                    </Badge>
                </Box>

                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"space-between"}
                    alignItems="center"
                >
                    <Box flex={1} maxW="4/5">
                        <Text color={"gray.500"} fontSize="xs">
                            {data.notes}
                        </Text>
                        <HStack marginTop={6} space="2">
                            <Ionicons name="calendar-outline" size={20} />
                            <Text>{data.date}</Text>
                        </HStack>
                        {/* <Box marginTop={6} display="flex" flexDirection={"row"} >
                           
                        </Box> */}
                    </Box>
                    <Box>
                        <Checkbox
                            size={"md"}
                            borderWidth="0"
                            p="3"
                            borderRadius={"full"}
                            colorScheme="green"
                            aria-label="success"
                        />
                    </Box>
                </Box>
            </Pressable>
        </Box>
    );
};

export default CardTodo;
