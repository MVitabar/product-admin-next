import { Metadata } from "next";
import aura from "../assets/Imagotipo2.png";
import Image from "next/image";
import SignInForm from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Aceede para ver tu lista de productos",
};

const AuthPage = () => {
  return (
    <>
      <div className="flex flex-col  items-center justify-center h-[95vh] md:flex-row md:justify-around md:mx-auto md:max-w-screen-xl">
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
          <Image src={aura} alt="Module Aura logo" className=" mb-8" priority />
        </div>
        <div className="w-11/12 md:w-1/3">
          <SignInForm />
        </div>
      </div>
      <footer className="text-center my-auto">
        <p className="text-sm">DNA-NOVA 2024. Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default AuthPage;
