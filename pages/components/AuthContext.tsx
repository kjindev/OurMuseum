import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext<any>({});
export const useAuth = () => useContext(AuthContext);

const initialState = {
  email: null,
  name: null,
  photo: null,
};
const reducer = (user: any, action: any) => {
  if (action.type === "Update") {
    return {
      email: action.payload.email,
      name: action.payload.name,
      photo: action.payload.photo,
    };
  }
};

export function AuthContextProvider({ children }: any) {
  const [user, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "Update",
          payload: {
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
          },
        });
      }
    });
    return () => authState();
  }, []);

  const logout = async () => {
    dispatch({
      type: "Update",
      payload: {
        email: null,
        name: null,
        photo: null,
      },
    });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
