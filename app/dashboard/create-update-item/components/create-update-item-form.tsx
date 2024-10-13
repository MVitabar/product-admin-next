/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createUser, setDocument, updateUser } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
// import toast from "react-hot-toast";
// import { User } from "@/interfaces/user.interface";
import { Textarea } from "@/components/ui/textarea";
import { ItemImage } from "@/interfaces/product-image.interface";
import DropImage from "@/components/DropImage";

const CreateUpdateItemForm = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const formSchema = z.object({
    image: z.object({
      path: z.string(),
      url: z.string(),
    }),
    name: z
      .string()
      .min(2, { message: "El nombre debe contener al menos 2 caracteres" }),
    description: z.string(),
    price: z.coerce.number().gte(0, "El valor debe ser mayor a cero"),
    category: z.string(),
    condition: z.string(),
    uid: z.string(),
    sku: z.string(),
    stock: z.coerce.number().gte(0, "La cantidad debe ser mayor a cero"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: {} as ItemImage,
      name: "",
      description: "",
      price: undefined,
      category: "",
      condition: "",
      uid: "",
      sku: "",
      stock: undefined,
    },
  });

  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  // ====Crear y actualizar productos====
  const onSubmit = async (item: z.infer<typeof formSchema>) => {
    console.log(item);
  };
  //=====Crear usuario en base de datos=====
  // const createUserInDb = async (user: User) => {
  //   const path = `users/${user.uid}`;
  //   setisLoading(true);
  //   try {
  //     delete user.password;
  //     await setDocument(path, user);
  //     toast.success(`Bienvenido ${user.name}`, { duration: 3000 });
  //   } catch (error: typeof Error | any) {
  //     toast.error(error.message, { duration: 3000 });
  //   } finally {
  //     setisLoading(false);
  //   }
  // };

  return (
    <div className="flex mx-auto items-center justify-center h-screen ">
      <form
        className="flex flex-col mx-auto p-4  items-center justify-center  border  border-gray-400 rounded-md "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Agrega tu producto</h1>
          <p className="mb-2"> Ingresa los datos de tu producto </p>
        </div>
        <div className="grid gap-2">
          <div className=" my-1 ">
            <Label className="text-sm" htmlFor="image">
              Imagen
            </Label>
            <DropImage />
          </div>
          <div className="my-1">
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
          <div className="my-1">
            <Label className="text-sm" htmlFor="description">
              Descripción
            </Label>
            <Textarea
              {...register("description")}
              id="description"
              placeholder="Descripción"
            />
          </div>

          <div className="my-1">
            <Label className="text-sm" htmlFor="price">
              Precio
            </Label>
            <Input
              {...register("price")}
              id="price"
              type="number"
              required
              placeholder="Precio"
              step="0.01"
            />
            <p className="form-error">{errors.price?.message}</p>
          </div>
          <div className=" my-1 ">
            <Label className="text-sm" htmlFor="category">
              Categoría
            </Label>
            <Input
              {...register("category")}
              id="category"
              type="text"
              required
              placeholder="Categoría"
            />
            <p className="form-error">{errors.category?.message}</p>
          </div>

          <div className="my-1">
            <Label className="text-sm" htmlFor="stock">
              Stock
            </Label>
            <Input
              {...register("stock")}
              id="stock"
              type="number"
              required
              placeholder="Stock"
              step="1"
            />
            <p className="form-error">{errors.stock?.message}</p>
          </div>

          <div className="my-1">
            <Label className="text-sm" htmlFor="condition">
              Condición
            </Label>
            <Input
              {...register("condition")}
              id="condition"
              type="text"
              required
              placeholder="Condición"
            />
            <p className="form-error">{errors.condition?.message}</p>
          </div>

          <div className="my-1">
            <Label className="text-sm" htmlFor="sku">
              SKU
            </Label>
            <Input
              {...register("sku")}
              id="sku"
              type="text"
              required
              placeholder="SKU"
            />
            <p className="form-error">{errors.sku?.message}</p>
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
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateItemForm;
