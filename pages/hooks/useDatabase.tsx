import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../components/AuthContext";

export default function useDatabase() {
  const { user } = useAuth();
  const addDatabase = (
    inputId: string,
    inputName: string,
    inputArtist: string,
    inputImg: string
  ) => {
    try {
      setDoc(doc(db, "data", user.email, "arts", inputId), {
        name: inputName,
        artist: inputArtist,
        img: inputImg,
        id: inputId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDatabase = (inputId: string) => {
    try {
      deleteDoc(doc(db, "data", user.email, "arts", inputId));
    } catch (error) {
      console.log(error);
    }
  };

  return { addDatabase, deleteDatabase };
}
