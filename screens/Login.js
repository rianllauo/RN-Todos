import React from "react";
import {
    Box,
    Button,
    FormControl,
    Image,
    Input,
    KeyboardAvoidingView,
    Link,
    Stack,
    Text,
} from "native-base";

const Login = ({ navigation, user, setUser, handleLogin, loading }) => {
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
                    Login
                </Text>
                {/* <KeyboardAvoidingView> */}
                <FormControl isRequired>
                    <Stack space={"2.5"}>
                        <Input
                            type="text"
                            bgColor={"gray.100"}
                            placeholder="Input Email"
                            // value={this.state.username}
                            onChangeText={(text) =>
                                setUser({ ...user, email: text })
                            }
                        />
                        <Input
                            type="password"
                            bgColor={"gray.100"}
                            placeholder="Input Password"
                            // value={this.state.password}
                            onChangeText={(text) =>
                                setUser({ ...user, password: text })
                            }
                        />
                        <Button
                            isLoading={loading}
                            isLoadingText="Logining ..."
                            _loading={{
                                // bgColor: "red.300",
                                _text: {
                                    color: "red.800",
                                    fontSize: "md",
                                },
                            }}
                            _spinner={{
                                color: "red.800",
                            }}
                            bgColor={"#FF5555"}
                            onPress={handleLogin}
                        >
                            <Text
                                fontSize="md"
                                fontWeight={"bold"}
                                color={"white"}
                            >
                                Login
                            </Text>
                        </Button>
                    </Stack>
                </FormControl>
                {/* </KeyboardAvoidingView> */}

                <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent="center"
                    alignItems={"center"}
                    marginTop="2"
                >
                    <Text textAlign="center" fontWeight={"bold"}>
                        New user ?
                    </Text>
                    <Link onPress={() => navigation.navigate("Register")}>
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

export default Login;
