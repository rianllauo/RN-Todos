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
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";

const CardTodo = ({ data, navigation }) => {
    const [category, setCategory] = useState({});

    const dataCategory = () => {
        data.category.map((category) => {
            setCategory(category);
        });
    };

    useEffect(() => {
        dataCategory();
    }, []);

    const dateFormat = moment(data.date).format("DD MMMM YYYY");

    return (
        <Box>
            <Pressable
                onPress={() =>
                    navigation.navigate("Detail", { itemId: data._id })
                }
                rounded="8"
                overflow="hidden"
                marginBottom={3}
                maxW="96"
                bg={data.color}
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

                    <Badge bg={category.color} borderRadius="md">
                        <Text color="white" fontWeight={"medium"}>
                            {category.name_category}
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
                        <Text
                            color={"gray.500"}
                            fontSize="xs"
                            numberOfLines={2}
                        >
                            {data.notes.length < 100
                                ? `${data.notes}`
                                : `${data.notes.substring(0, 200)}...`}
                        </Text>
                        <HStack marginTop={6} space="2">
                            <Ionicons name="calendar-outline" size={20} />
                            <Text>{dateFormat}</Text>
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
