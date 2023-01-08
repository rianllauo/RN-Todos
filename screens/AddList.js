import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    FormControl,
    Heading,
    HStack,
    IconButton,
    Input,
    Pressable,
    Select,
    Text,
    TextArea,
    VStack,
} from "native-base";
import axios from "axios";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const AddList = () => {
    const [date, setDate] = useState(new Date());
    const [dataCategory, setDataCategory] = useState();
    const [userID, setUserID] = useState();

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("userID");
            setUserID(value);
        } catch (e) {
            console.log(e);
        }
    };

    const dateFormatted = moment(date).format("YYYY-MM-DD");

    const [list, setList] = useState({
        title: "",
        notes: "",
        category: [],
        date: dateFormatted,
        Users: [],
        isDone: false,
        color: "",
    });

    const [color, setColor] = useState();

    // constum color
    const getColor = () => {
        const number = Math.random();
        if (number > 0 && number < 0.15) {
            setColor("#fecaca");
        } else if (number > 0.16 && number < 0.25) {
            setColor("#bbf7d0");
        } else if (number > 0.26 && number < 0.35) {
            setColor("#a5f3fc");
        } else if (number > 0.36 && number < 0.45) {
            setColor("#bae6fd");
        } else if (number > 0.46 && number < 0.55) {
            setColor("#e9d5ff");
        } else if (number > 0.56 && number < 0.65) {
            setColor("#fed7aa");
        } else if (number > 0.66 && number < 0.75) {
            setColor("#fef08a");
        } else if (number > 0.76 && number < 0.85) {
            setColor("#ddd6fe");
        } else if (number > 0.86 && number < 1) {
            setColor("#f5d0fe");
        }
    };

    const handleAddList = async () => {
        try {
            const body = JSON.stringify(list);

            const response = await axios.post(
                "https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/todos",
                body
            );
            console.log(response.data);
            alert("berhasil ");
            setList("");
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const fetchCategory = async () => {
        const response = await axios.get(
            `https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/category?$lookup=*&Users[0]=${userID}`
        );

        setDataCategory(response.data);
    };

    useEffect(() => {
        fetchCategory();
    }, [userID]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setList({ ...list, date: moment(currentDate).format("YYYY-MM-DD") });
    };

    const showMode = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: date,
            is24Hour: true,
        });
    };

    console.log(list);

    return (
        <Box pt={"16"} px="4" bg={"white"} h="full">
            <Heading>Add List</Heading>

            <FormControl mt={6}>
                <VStack space={3}>
                    <Input
                        variant={"filled"}
                        placeholder="Name"
                        w="100%"
                        onChangeText={(text) => {
                            getColor();
                            setList({
                                ...list,
                                title: text,
                                Users: [userID],
                                color: color,
                            });
                        }}
                    />

                    <Select
                        // selectedValue={service}
                        bg={"gray.100"}
                        accessibilityLabel="Choose Service"
                        placeholder="Choose Service"
                        _selectedItem={{
                            bg: "teal.600",
                            // endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) =>
                            setList({ ...list, category: [itemValue] })
                        }
                    >
                        {dataCategory?.map((item, index) => (
                            <Select.Item
                                key={index}
                                label={item.name_category}
                                value={item._id}
                            />
                        ))}
                    </Select>

                    <Pressable
                        onPress={showMode}
                        w={"full"}
                        bg="gray.100"
                        px={3}
                        py="2.5"
                    >
                        <HStack justifyContent={"space-between"}>
                            <Text color={"gray.400"} fontSize="xs">
                                {/* {date.toDateString()} */}
                            </Text>
                            <AntDesign name="calendar" size={24} color="gray" />
                        </HStack>
                    </Pressable>
                    <TextArea
                        bg={"gray.100"}
                        h={"40"}
                        placeholder="Text Area Placeholder"
                        onChangeText={(text) =>
                            setList({ ...list, notes: text })
                        }
                    />
                    <Button bg={"#FF5555"} onPress={handleAddList}>
                        <Text fontSize={"md"} color="white" fontWeight={"bold"}>
                            Add List
                        </Text>
                    </Button>
                </VStack>
            </FormControl>
        </Box>
    );
};

export default AddList;
