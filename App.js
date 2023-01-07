import React, { useContext, useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { StatusBar } from "expo-status-bar";
import HomePage from "./screens/HomePage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loading from "./screens/Loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodoList from "./screens/TodoList";
import HomeScreen from "./screens/HomeScreen";
import Category from "./screens/Category";
import AddList from "./screens/AddList";

import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function App() {
    const Stack = createNativeStackNavigator();

    const [foundToken, setFoundToken] = useState("");
    const [isLoad, setIsLoad] = useState(true);

    const checkToken = async () => {
        try {
            let findingToken = await AsyncStorage.getItem("token");
            setFoundToken(findingToken);
            setIsLoad(false);
        } catch (error) {
            console.log(error);
        }
    };

    // user login & register
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const body = JSON.stringify(user);

            const response = await axios.post(
                "https://api.kontenbase.com/query/api/v1/c96cdbdc-16c9-44b4-83e8-c61b4d3f6761/auth/login",
                body
            );
            const userToken = JSON.stringify(response.data.token);
            const userID = response.data.user._id;
            await AsyncStorage.setItem("token", userToken);
            await AsyncStorage.setItem("userID", userID);
            setFoundToken(userToken);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.message);
        }
    };

    const [userID, setUserID] = useState();
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("userID");
            setUserID(value);
        } catch (e) {
            console.log(e);
        }
    };

    const logoutAction = async () => {
        try {
            AsyncStorage.removeItem("token");
            AsyncStorage.removeItem("userID");
            alert("logout");
            setFoundToken("");
            setUserID("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkToken();
    }, [foundToken]);

    const Tab = createBottomTabNavigator();

    useEffect(() => {
        getData();
        // fecthUser();
    }, []);

    // console.log(todos);

    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <StatusBar style={{ color: "black" }} />

                <Stack.Navigator>
                    {foundToken ? (
                        <Stack.Screen
                            name="Home"
                            options={{ headerShown: false }}
                        >
                            {() => (
                                <Tab.Navigator
                                    screenOptions={({ route }) => ({
                                        tabBarIcon: ({
                                            focused,
                                            color,
                                            size,
                                        }) => {
                                            let home;
                                            let addList;
                                            let category;

                                            if (route.name === "HomeScreen") {
                                                home = focused
                                                    ? "clipboard-list"
                                                    : "clipboard-list";
                                            } else if (
                                                route.name === "AddList"
                                            ) {
                                                addList = focused
                                                    ? "post-add"
                                                    : "post-add";
                                            } else if (
                                                route.name === "Category"
                                            ) {
                                                category = focused
                                                    ? "category"
                                                    : "category";
                                            }

                                            if (route.name === "Category") {
                                                return (
                                                    <MaterialIcons
                                                        name={category}
                                                        size={size}
                                                        color={color}
                                                    />
                                                );
                                            }
                                            if (route.name === "HomeScreen") {
                                                return (
                                                    <FontAwesome5
                                                        name={home}
                                                        size={size}
                                                        color={color}
                                                    />
                                                );
                                            }
                                            if (route.name === "AddList") {
                                                return (
                                                    <MaterialIcons
                                                        name={addList}
                                                        size={size}
                                                        color={color}
                                                    />
                                                );
                                            }
                                        },
                                        tabBarActiveTintColor: "#dc2626",
                                        tabBarInactiveTintColor: "gray",
                                        tabBarShowLabel: false,
                                    })}
                                >
                                    <Tab.Screen
                                        name="HomeScreen"
                                        options={{ headerShown: false }}
                                    >
                                        {(props) => (
                                            <HomeScreen
                                                {...props}
                                                logoutAction={logoutAction}
                                                loadingAction={loading}
                                            />
                                        )}
                                    </Tab.Screen>
                                    <Tab.Screen
                                        name="AddList"
                                        options={{ headerShown: false }}
                                    >
                                        {(props) => <AddList {...props} />}
                                    </Tab.Screen>
                                    <Tab.Screen
                                        name="Category"
                                        options={{ headerShown: false }}
                                    >
                                        {(props) => (
                                            <Category
                                                {...props}
                                                userId={userID}
                                            />
                                        )}
                                    </Tab.Screen>
                                </Tab.Navigator>
                            )}
                        </Stack.Screen>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="Login"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <Login
                                        {...props}
                                        user={user}
                                        handleLogin={handleLogin}
                                        setUser={setUser}
                                        loading={loading}
                                    />
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NativeBaseProvider>
        </NavigationContainer>
    );
}
