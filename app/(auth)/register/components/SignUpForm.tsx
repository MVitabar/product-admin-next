"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser, setDocument, updateUser } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import { User } from "@/interfaces/user.interface";

const SignUpForm = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const formSchema = z.object({
    uid: z.string(),
    name: z
      .string()
      .min(2, { message: "El nombre debe contener al menos 2 caracteres" }),
    email: z
      .string()
      .email("El Email es inválido. Ejemplo name@email.com")
      .min(1, { message: "Email es requerido" }),

    password: z
      .string()
      .min(6, { message: "El password debe contener al menos 6 caracteres" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  // ====Iniciar Sesion====
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    setisLoading(true);
    try {
      const res = await createUser(user);
      await updateUser({ displayName: user.name });
      user.uid = res.user.uid;
      await createUserInDb(user as User);
    } catch (error: typeof Error | unknown) {
      toast.error(error.message, { duration: 3000 });
    } finally {
      setisLoading(false);
    }
    console.log(user);
  };
  //=====Crear usuario en base de datos=====
  const createUserInDb = async (user: User) => {
    const path = `users/${user.uid}`;
    setisLoading(true);
    try {
      delete user.password;
      await setDocument(path, user);
      toast.success(`Bienvenido ${user.name}`, { duration: 3000 });
    } catch (error: typeof Error | unknown) {
      toast.error(error.message, { duration: 3000 });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex mx-auto items-center justify-center h-screen ">
      <form
        className="flex flex-col mx-auto items-center justify-center w-4/6 h-3/5 border md:w-3/6 md:h-3/5 border-gray-400 rounded-md "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Regístrate</h1>
          <p className="mb-4"> Accede para ver tu lista de productos </p>
        </div>
        <div className="grid gap-2">
          <div className=" space-y-2 mb-4 ">
            <Label className="text-sm" htmlFor="name">
              Name
            </Label>
            <Input
              {...register("name")}
              id="name"
              type="text"
              required
              placeholder="Nombre"
              autoComplete="name"
            />
            <p className="form-error">{errors.name?.message}</p>
          </div>
          <div className=" space-y-2 mb-4 ">
            <Label className="text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              required
              placeholder="name@email.com"
              autoComplete="email"
            />
            <p className="form-error">{errors.email?.message}</p>
          </div>
          <div className=" space-y-2 mb-4 gap-2">
            <Label className="text-sm" htmlFor="password">
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              required
              placeholder="******"
            />
            <p className="form-error">{errors.password?.message}</p>
          </div>

          <div className="flex justify-center">
            <Button
              disabled={isLoading}
              {...(isLoading && (
                <LoaderCircleIcon className="mr-2 w-8 h-8 animate-spin" />
              ))}
              className="w-8/12"
              type="submit"
            >
              Regístrate
            </Button>
          </div>
          <div className="text-center mt-4">
            <p>
              Ya tienes una cuenta?{" "}
              <Link
                href="/"
                className="underline-offset-4 underline text-muted-foreground hover:text-primary"
              >
                Ingresa aquí
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
