import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

interface State {
  email: string | null;
  name: string | null;
  photo: string | null;
}

interface Action {
  type: "Update";
  payload: {
    email: string | null;
    name: string | null;
    photo: string | null;
  };
}

const AuthContext = createContext<any>({});
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState: State = {
    email: null,
    name: null,
    photo: null,
  };

  const reducer = (user: State, action: Action): State => {
    if (action.type === "Update") {
      return {
        email: action.payload.email,
        name: action.payload.name,
        photo: action.payload.photo,
      };
    }
    return user;
  };
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
