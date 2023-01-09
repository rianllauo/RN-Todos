import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
    Badge,
    Box,
    Checkbox,
    Heading,
    ScrollView,
    Text,
    VStack,
} from "native-base";

const Detail = ({ route }) => {
    const { itemId } = route.params;

    const { data: todos } = useQuery("CacheTodos", async () => {
        const response = await axios.get(
            `https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/todos/${itemId}?$lookup=*`
        );
        return response.data;
        // setTodos(response.data);
    });

    const [category, setCategory] = useState({});

    const dataCategory = () => {
        todos?.category.map((category) => {
            setCategory(category);
        });
    };

    useEffect(() => {
        dataCategory();
    }, [todos]);

    return (
        <ScrollView bg={"white"} w={"full"}>
            <Box m={6} p={"6"} bg={todos?.color} style={{ borderRadius: 12 }}>
                <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    flexDirection={"row"}
                    mb={"4"}
                >
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {todos?.title}
                    </Text>
                    <VStack alignItems={"flex-end"} space="3">
                        <Badge bg={category.color} borderRadius="md">
                            <Text color="white" fontWeight={"medium"}>
                                {category.name_category}
                            </Text>
                        </Badge>
                        <Checkbox
                            padding={"3"}
                            borderRadius={"full"}
                            borderWidth={0}
                            checked={true}
                            color="green"
                            aria-label="Check"
                        />
                    </VStack>
                </Box>
                <Box>
                    <Text fontSize={"md"} fontWeight={"medium"}>
                        {todos?.notes}
                    </Text>
                </Box>
            </Box>
        </ScrollView>
    );
};

export default Detail;
