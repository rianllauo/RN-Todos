import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Center,
    Divider,
    FlatList,
    FormControl,
    HStack,
    Input,
    Stack,
    Text,
    VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import BadgeCategory from "../Components/BadgeCategory";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListCategory from "../Components/ListCategory";

const Category = () => {
    const [userID, setUserID] = useState();
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("userID");
            setUserID(value);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const [category, setCategory] = useState({
        name_category: "",
        Users: [],
        color: "",
    });

    const [color, setColor] = useState();

    // constum color
    const getColor = () => {
        const number = Math.random();
        if (number > 0 && number < 0.25) {
            setColor("#2563eb");
            // setCategory({ ...category, color: "#2563eb" });
        } else if (number > 0.26 && number < 0.56) {
            setColor("#e11d48");
            // setCategory({ ...category, color: "#e11d48" });
        } else if (number > 0.57 && number < 0.75) {
            setColor("#fb923c");
            // setCategory({ ...category, color: "#fb923c" });
        } else if (number > 0.76 && number < 1) {
            setColor("#22c55e");
            // setCategory({ ...category, color: "#22c55e" });
        }
    };

    // console.log(color);

    const handleAddCategory = async () => {
        try {
            const body = JSON.stringify(category);

            const response = await axios.post(
                "https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/category",
                body
            );
            console.log(response.data);
            fetchCategory();
            alert("berhasil ");
            setCategory("");
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.message);
        }
    };

    const [dataCategory, setDataCategory] = useState();

    const fetchCategory = async () => {
        const response = await axios.get(
            `https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/category?$lookup=*&Users[0]=${userID}`
        );

        setDataCategory(response.data);
    };

    useEffect(() => {
        fetchCategory();
    }, [userID]);

    return (
        <Box pt={12} px={"4"} bg="white" h={"full"}>
            <Text fontSize={"2xl"} fontWeight="bold">
                Add Category
            </Text>

            <FormControl mt={6}>
                <VStack space={6}>
                    <Input
                        value={category}
                        onChangeText={(text) => {
                            getColor();
                            setCategory({
                                ...category,
                                name_category: text,
                                Users: [userID],
                                color: color,
                            });
                        }}
                        variant={"filled"}
                        placeholder="Input"
                        w="full"
                    />

                    <Button onPress={handleAddCategory} bg={"#FF5555"}>
                        <Text color={"white"} fontWeight="bold" fontSize={"md"}>
                            Add Country
                        </Text>
                    </Button>
                </VStack>
            </FormControl>
            {/* <Button onPress={getColor}>COlor</Button> */}

            <Box mt={12}>
                <Text fontSize={"2xl"} fontWeight="bold">
                    List Category
                </Text>
                <Stack mt={3}>
                    <ListCategory data={dataCategory} />
                </Stack>
            </Box>
        </Box>
    );
};

export default Category;
