import { getFromLocalStorage } from "@/actions/get-from-local-storage";
import { setInLocalStorage } from "@/actions/set-in-local-storage";
import { User } from "@/interfaces/user.interface";
import { auth, getDocument } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined | DocumentData>(undefined);
  const pathName = usePathname();
  const router = useRouter();

  const protectedRoutes = ["/dashboard"];
  const isInProtectedRoute = protectedRoutes.includes(pathName);
  const getUserFromDb = async (uid: string) => {
    const path = `users/${uid}`;
    try {
      // eslint-disable-next-line prefer-const
      let res = await getDocument(path);
      setUser(res);

      setInLocalStorage("user", res);
    } catch (error) {
      console.error(`Error getting user from database: ${error}`);
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (authUser) => {
      //====Con usuario autenticado====
      if (authUser) {
        const userInLocal = getFromLocalStorage("user");
        if (userInLocal) setUser(userInLocal);
        else getUserFromDb(authUser.uid);
      }
      //====Sin usuario autenticado====
      else {
        if (isInProtectedRoute) router.push("/");
      }
    });
  }, [isInProtectedRoute, router, user]);

  return user;
};
