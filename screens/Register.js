import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    Image,
    Input,
    Stack,
    Text,
    Link,
} from "native-base";
import axios from "axios";

import RNDateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

const Register = ({ navigation }) => {
    const [user, setUser] = useState({
        firstName: "",
        email: "",
        password: "",
    });

    const handleRegister = async () => {
        try {
            const body = JSON.stringify(user);

            const response = await axios.post(
                "https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/auth/register",
                body
            );
            console.log(response.data);
            alert("Registration Success!");
            // navigation.navigate("Homepage");
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.message);
        }
    };

    return (
        <Box bg="#fff" flex={1} justifyContent="center">
            <Box display={"flex"} alignItems="center" justifyContent="center">
                <Image
                    source={require("../assets/icons/LoginIcon.png")}
                    alt="Login Icon"
                    width={256}
                    height={183}
                />
            </Box>
            <Box paddingTop={"12"} paddingX="8" textAlign={"start"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} marginBottom={"4"}>
                    Register
                </Text>
                <FormControl>
                    <Stack space={"2.5"}>
                        <Input
                            type="text"
                            bgColor={"gray.100"}
                            placeholder="Input Your Name"
                            onChangeText={(text) =>
                                setUser({ ...user, firstName: text })
                            }
                        />
                        <Input
                            type="email"
                            bgColor={"gray.100"}
                            placeholder="Input Your Email"
                            onChangeText={(text) =>
                                setUser({ ...user, email: text })
                            }
                        />
                        <Input
                            type="password"
                            bgColor={"gray.100"}
                            placeholder="Select Your Password"
                            onChangeText={(text) =>
                                setUser({ ...user, password: text })
                            }
                        />
                        <Button bgColor={"#FF5555"} onPress={handleRegister}>
                            <Text
                                fontSize="md"
                                fontWeight={"bold"}
                                color={"white"}
                            >
                                Register
                            </Text>
                        </Button>
                    </Stack>
                </FormControl>

                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent="center"
                    alignItems={"center"}
                    marginTop="2"
                >
                    <Text textAlign="center" fontWeight={"bold"}>
                        Joined us before ?
                    </Text>
                    <Link onPress={() => navigation.navigate("Login")}>
                        <Text color={"#FF5555"} fontWeight={"bold"}>
                            {" "}
                            Login
                        </Text>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;
