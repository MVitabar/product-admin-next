/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Logo from "../app/assets/Isologo-Icon.png";
import { Button } from "./ui/button";
import { signOutAccount } from "@/lib/firebase";
import { useUser } from "@/hooks/use-user";
// import { setInLocalStorage } from "@/actions/set-in-local-storage";
// import { CircleUserRound, LoaderCircle } from "lucide-react";
// import { useEffect, useState } from "react";
// import { fileToBase64 } from "@/actions/convert-file-to-base64";
// import toast from "react-hot-toast";

const NavBar = () => {
  const user = useUser();
  // const [image, setimage] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (user?.image) {
  //     setimage(user.image);
  //   }
  // }, [user]);

  // ==== Seleccionar imagen de perfil====
  // const chooseImage = async (event: any) => {
  //   const file = event.target.files[0];

  //   if (!file || !file.type.startsWith("image/")) {
  //     toast.error("Por favor selecciona un archivo de imagen válido");
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const base64 = await fileToBase64(file);
  //     const imagePath = `${user?.uid}/profile`;

  //     const imageUrl = await uploadBase64(imagePath, base64);

  //     await updateDocument(`users/${user?.uid}`, { image: imageUrl });

  //     setimage(imageUrl);
  //     if (user) {
  //       user.image = imageUrl;
  //       setInLocalStorage("user", user);
  //     }

  //     toast.success("Imagen de perfil actualizada", {
  //       duration: 3000,
  //     });
  //   } catch (error: any) {
  //     toast.error("Error al actualizar la imagen de perfil", {
  //       duration: 3000,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between w-full mx-3 mb-10 md:max-w-screen-2xl py-4 border-b border-solid border-gray-200  ">
        <Image src={Logo} alt="logo" className="w-12 h-12" priority />
        <div className="flex justify-center items-center ">
          {/* <div className="flex justify-center items-center ">
            {isLoading ? (
              <Image
                src={image}
                alt="profile"
                className="w-8 h-8 rounded-full"
                priority
              />
            ) : (
              <>
                <input
                  className="hidden"
                  id="file"
                  type="file"

                  accept="image/png, image/jpeg, image/webp"
                  onChange={(event) => chooseImage(event)}
                ></input>
                <label
                  htmlFor="file"
                  className="w-8 h-8 cursor-pointer"
                  aria-label="Subir imagen de perfil"
                >
                  <CircleUserRound className="w-8 h-8" />
                </label>
              </>
            )}
          </div> */}

          <h1 className="text-xl font-bold">{user?.name}</h1>
        </div>
        <Button variant="outline" onClick={() => signOutAccount()}>
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
