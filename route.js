import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "./screens/Detail";

const HomeStack = createNativeStackNavigator();
export default function App() {
    // query
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

    return (
        <NavigationContainer>
            {foundTokens ? (
                <>
                    <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen name="Home" component={HomeStackScreen}>
                            {() => (
                                <HomeStack.Navigator>
                                    <HomeStack.Screen
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
                                    </HomeStack.Screen>
                                    <HomeStack.Screen
                                        name="Detail"
                                        component={Detail}
                                    />
                                </HomeStack.Navigator>
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
                            {(props) => <Category {...props} userId={userID} />}
                        </Tab.Screen>
                    </Tab.Navigator>
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen name="Login" options={{ headerShown: false }}>
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
        </NavigationContainer>
    );
}
