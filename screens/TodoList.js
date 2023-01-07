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
} from "native-base";

const TodoList = ({ logoutAction }) => {
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: date,
            is24Hour: true,
        });
    };

    console.log(date);
    return (
        <Box mt={"10"} px={"6"}>
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
                        Hi Rian
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
                <Stack>
                    <Input
                        variant={"outline"}
                        bgColor={"gray.200"}
                        placeholder="Input"
                        w="100%"
                    />
                </Stack>
                <Stack>
                    <Pressable onPress={showMode}>
                        <Text>Date</Text>
                    </Pressable>
                </Stack>
            </Box>
            {/* input group */}
        </Box>
    );
};

export default TodoList;
