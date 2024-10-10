/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendResetEmail } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const router = useRouter();
  const formSchema = z.object({
    email: z
      .string()
      .email("El Email es inválido. Ejemplo name@email.com")
      .min(1, { message: "Email es requerido" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { formState, handleSubmit } = form;
  const { errors } = formState;

  // ====Iniciar Sesion====
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    setisLoading(true);
    try {
      await sendResetEmail(user.email);
      console.log("Sending reset email to:", user.email);
      toast.success("Se envio un E-mail para restablecer la contraseña", {
        duration: 3000,
      });
      router.push("/");
    } catch (error: typeof Error | any) {
      console.error("Error sending reset email:", error);
      toast.error(error.message, { duration: 3000 });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        className="flex flex-col py-6 px-4 text-center items-center justify-center border border-gray-400 rounded-lg gap-3 w-8/12 md:w-2/4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold mb-2">Recupera tu contraseña</h1>
        <p className="text-center">
          Enviaremos un E-mail para restablecer la contraseña
        </p>{" "}
        <div className="flex flex-col w-3/4 gap-2">
          <div className=" space-y-2 mb-4 ">
            <Label className="text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              className=" w-full "
              type="email"
              name="email"
              id="email"
              required
              autoComplete="email"
              placeholder="user@email.com"
            />
            <p className="form-error">{errors.email?.message}</p>
          </div>
          <div>
            <Button
              disabled={isLoading}
              {...(isLoading && (
                <LoaderCircleIcon className="mr-2 w-8 h-8 animate-spin" />
              ))}
              className="w-8/12"
              type="submit"
            >
              Recuperar
            </Button>
          </div>
          <Link
            href="/"
            className=" mt-4 text-md text-blue-500 hover:text-blue-700"
          >
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
