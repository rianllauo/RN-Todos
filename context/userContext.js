import { createContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export let UserContext = createContext();

const initialState = {
    isLogin: false,
    user: {},
};

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "USER_SUCCESS":
        case "LOGIN_SUCCESS":
            AsyncStorage.setItem("token", payload.token);
            // localStorage.setItem("user", JSON.stringify(payload));
            return {
                isLogin: true,
                user: payload,
            };
        case "AUTH_ERROR":
        case "LOGOUT":
            AsyncStorage.removeItem("token");
            // AsyncStorage.removeItem("user");
            return {
                isLogin: false,
                user: {},
            };
        default:
            throw new Error();
    }
};

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
};
