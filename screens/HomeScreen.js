// import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import {
    FlatList,
    Text,
    Box,
    Menu,
    Divider,
    Pressable,
    Stack,
    Input,
    HStack,
    Button,
    Select,
    Avatar,
    VStack,
} from "native-base";
import CardTodo from "../Components/CardTodo";
import axios from "axios";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import { RefreshControl } from "react-native";

const HomeScreen = ({ logoutAction, navigation }) => {
    const [date, setDate] = useState(new Date());
    const [refreshing, setRefreshing] = useState(true);

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

    useEffect(() => {
        fecthUser();
        // fetchTodo();
    }, [userID]);

    // console.log(userID);

    // render todo list

    const [todos, setTodos] = useState();

    const fetchTodo = async () => {
        const response = await axios.get(
            `https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/todos?$lookup=*&Users[0]=${userID}`
        );
        setRefreshing(false);
        setTodos(response.data);
        // setLoading("");
    };

    // const { data: todos, refetch } = useQuery(
    //     ["CacheTodos", userID],
    //     async () => {
    //         const response = await axios.get(
    //             `https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/todos?$lookup=*&Users[0]=${userID}`
    //         );
    //         setRefreshing(false);
    //         return response.data;
    //         // setTodos(response.data);
    //     }
    // );
    console.log(todos);

    // render get user
    const [dataUser, setDataUser] = useState();

    const fecthUser = async () => {
        const response = await axios.get(
            `https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/Users/${userID}`
        );
        setDataUser(response.data);
        console.log(response.data);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: date,
            is24Hour: true,
        });
    };

    // get greeting by date
    const getTime = new Date();
    const time = getTime.getHours();
    const [day, setDay] = useState();

    const DayTime = time > 6 && time < 18;
    const DayNight = time > 18 && time < 24;
    const Subuh = time > 0 && time < 6;

    const getDayNight = () => {
        if (DayTime === true) {
            setDay("Siang");
        }
        if (DayNight === true) {
            setDay("Malam");
        }
        if (Subuh === true) {
            setDay("Subuh");
        }
    };

    useEffect(() => {
        getDayNight();
    }, []);

    console.log(time);

    return (
        <FlatList
            bg={"white"}
            data={todos ? todos : null}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={fetchTodo} />
            }
            extraData={todos}
            ListHeaderComponent={
                <Box pt={12} px={"4"} bg="white">
                    {/* header */}
                    <Box
                        display={"flex"}
                        flexDirection="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        marginBottom="10"
                    >
                        <Box>
                            <VStack>
                                <Text
                                    fontSize={"2xl"}
                                    fontWeight="bold"
                                    key={1}
                                >
                                    Hi, {dataUser?.firstName}
                                </Text>
                                <Text
                                    fontSize={"2xl"}
                                    fontWeight="bold"
                                    key={2}
                                >
                                    Selamat {day}
                                </Text>
                            </VStack>
                            <Text color={"pink.500"}>200 List</Text>
                        </Box>
                        <Menu
                            w="190"
                            trigger={(triggerProps) => {
                                return (
                                    <Pressable {...triggerProps}>
                                        <Avatar
                                            borderWidth={"2"}
                                            borderColor="green.400"
                                            bg="green.500"
                                            source={{
                                                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                            }}
                                        >
                                            AJ
                                        </Avatar>
                                    </Pressable>
                                );
                            }}
                        >
                            <Menu.Group>
                                <Menu.Item key={1}>Profile</Menu.Item>
                                <Menu.Item key={2}>List Todo</Menu.Item>
                                <Menu.Item key={3}>Roboto</Menu.Item>
                                <Menu.Item key={4}>
                                    <Pressable onPress={logoutAction} key={1}>
                                        <Text
                                            color={"red.500"}
                                            fontWeight="bold"
                                        >
                                            Logout
                                        </Text>
                                    </Pressable>
                                </Menu.Item>
                            </Menu.Group>
                        </Menu>
                    </Box>
                    {/* header */}

                    {/* input group */}
                    <Box pb={4}>
                        <Stack space={3}>
                            <Stack>
                                <Input
                                    variant={"outline"}
                                    bgColor={"gray.200"}
                                    placeholder="Input"
                                    w="100%"
                                />
                            </Stack>
                            <HStack
                                display={"flex"}
                                flexDirection="row"
                                // justifyContent="space-between"
                                alignItems={"center"}
                                space="3"
                            >
                                <Button
                                    flex={1}
                                    onPress={showMode}
                                    bgColor={"gray.200"}
                                    variant="outline"
                                >
                                    <Text color={"gray.400"} fontSize="xs">
                                        Choose Date
                                    </Text>
                                </Button>
                                {/* <Select
                                    flex={1}
                                    placeholder="Category"
                                    bgColor={"gray.200"}
                                    // dropdownIcon={
                                    //     <></>
                                    //     // <Ionicons name="caret-down-outline" size={15``} />
                                    // }
                                >
                                    <Select.Item
                                        label="UX Research"
                                        value="ux"
                                        key={1}
                                    />
                                    <Select.Item
                                        label="Web Development"
                                        value="web"
                                        key={2}
                                    />
                                    <Select.Item
                                        label="Cross Platform Development"
                                        value="cross"
                                        key={3}
                                    />
                                    <Select.Item
                                        label="UI Designing"
                                        value="ui"
                                        key={4}
                                    />
                                    <Select.Item
                                        label="Backend Development"
                                        value="backend"
                                        key={5}
                                    />
                                </Select>
                                <Select
                                    flex={1}
                                    accessibilityLabel="Choose Service"
                                    placeholder="Category"
                                    bgColor={"gray.200"}
                                    // dropdownIcon={
                                    //     <></>
                                    //     // <Ionicons name="caret-down-outline" size={15``} />
                                    // }
                                    // onValueChange={(itemValue) => setService(itemValue)}
                                >
                                    <Select.Item
                                        label="UX Research"
                                        value="ux"
                                        key={6}
                                    />
                                    <Select.Item
                                        label="Web Development"
                                        value="web"
                                        key={7}
                                    />
                                    <Select.Item
                                        label="Cross Platform Development"
                                        value="cross"
                                        key={8}
                                    />
                                    <Select.Item
                                        label="UI Designing"
                                        value="ui"
                                        key={9}
                                    />
                                    <Select.Item
                                        label="Backend Development"
                                        value="backend"
                                        key={10}
                                    />
                                </Select> */}
                            </HStack>
                        </Stack>
                    </Box>
                </Box>
            }
            renderItem={({ item }) => {
                return (
                    <Box px={4} bg="white">
                        <CardTodo
                            data={item}
                            key={item.id}
                            navigation={navigation}
                        />
                    </Box>
                );
            }}
            keyExtractor={(item, index) => index}
        />
    );
};

export default HomeScreen;
