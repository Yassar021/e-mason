/* eslint-disable react-hooks/rules-of-hooks */
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import functions from "./function"

const auth = getAuth();
const getUser = httpsCallable(functions, 'getUser');

export const authCheck = () => {
    const [check, setCheck] = useState(false);
    const [user, setUser] = useState('');
    
    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
          if (user) {
            const dataUser = await getUser(user.uid)
            setCheck(true)
            setUser(dataUser)
          } else {
            setCheck(false)
          }
        });
    }, [setCheck, setUser])

    return [check, user];
}

export const handleLogout = async (router) => {
  await signOut(auth);
  router.replace('/')
}
