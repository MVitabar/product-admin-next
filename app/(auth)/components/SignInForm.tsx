/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

const SignInForm = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const formSchema = z.object({
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
      await signIn(user);
    } catch (error: typeof Error | any) {
      toast.error(error.message, { duration: 3000 });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <p className="mb-4"> Accede para ver tu lista de productos </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
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
          <Link
            className="text-sm text-muted-foreground underline hover:text-primary text-end "
            href="/forgot-password"
          >
            Olvidaste tu password?
          </Link>
          <div className="flex justify-center">
            <Button disabled={isLoading} className="w-8/12" type="submit">
              {isLoading ? (
                <LoaderCircleIcon className="mr-2 w-8 h-8 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
          <div className="text-center mt-4">
            <p>
              No tienes una cuenta?{" "}
              <Link
                href="/register"
                className="underline-offset-4 underline text-muted-foreground hover:text-primary"
              >
                Registrate aquí
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
