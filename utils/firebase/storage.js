import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./function";

const storageRef = ref(storage, new Date().toISOString());

export const uploadFile = (file) => {
    return uploadBytes(storageRef, file);
};