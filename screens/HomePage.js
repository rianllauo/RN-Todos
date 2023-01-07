import React, { useState } from "react";

import {
    Box,
    Button,
    Input,
    Text,
    Avatar,
    Stack,
    Menu,
    Divider,
    Pressable,
    Select,
    CheckIcon,
    HStack,
    Icon,
    ScrollView,
    VStack,
    FlatList,
    Center,
} from "native-base";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import CardTodo from "../Components/CardTodo";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = ({ logoutAction, todos }) => {
    const Tab = createBottomTabNavigator();

    console.log(todos);

    return (
        <ScrollView>
            <Box pt={10} px={"6"} bg="white">
                {/* header */}
                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginBottom="10"
                >
                    <Box>
                        <Text fontSize={"2xl"} fontWeight="bold">
                            {todos?.title}
                        </Text>
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
                            <Menu.Item>Profile</Menu.Item>
                            <Menu.Item>List Todo</Menu.Item>
                            <Menu.Item>Roboto</Menu.Item>
                        </Menu.Group>
                        <Divider w="100%" />
                        <Menu.Item>
                            <Pressable onPress={logoutAction}>
                                <Text color={"red.500"} fontWeight="bold">
                                    Logout
                                </Text>
                            </Pressable>
                        </Menu.Item>
                    </Menu>
                </Box>
                {/* header */}

                {/* input group */}
                <Box>
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
                            <Select
                                flex={1}
                                placeholder="Category"
                                bgColor={"gray.200"}
                                dropdownIcon={
                                    <></>
                                    // <Ionicons name="caret-down-outline" size={15``} />
                                }
                            >
                                <Select.Item label="UX Research" value="ux" />
                                <Select.Item
                                    label="Web Development"
                                    value="web"
                                />
                                <Select.Item
                                    label="Cross Platform Development"
                                    value="cross"
                                />
                                <Select.Item label="UI Designing" value="ui" />
                                <Select.Item
                                    label="Backend Development"
                                    value="backend"
                                />
                            </Select>
                            <Select
                                flex={1}
                                accessibilityLabel="Choose Service"
                                placeholder="Category"
                                bgColor={"gray.200"}
                                dropdownIcon={
                                    <></>
                                    // <Ionicons name="caret-down-outline" size={15``} />
                                }
                                // onValueChange={(itemValue) => setService(itemValue)}
                            >
                                <Select.Item label="UX Research" value="ux" />
                                <Select.Item
                                    label="Web Development"
                                    value="web"
                                />
                                <Select.Item
                                    label="Cross Platform Development"
                                    value="cross"
                                />
                                <Select.Item label="UI Designing" value="ui" />
                                <Select.Item
                                    label="Backend Development"
                                    value="backend"
                                />
                            </Select>
                        </HStack>
                    </Stack>
                </Box>

                <CardTodo data={todos} />
            </Box>
        </ScrollView>
    );
};

export default HomePage;
