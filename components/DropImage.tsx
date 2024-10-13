/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDropzone } from "react-dropzone";

const DropImage = () => {
  const onDrop = (acceptedFiles: any[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    // // Aquí puedes hacer la llamada a tu API para subir el archivo
    // fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // }).then((response) => {
    //   if (response.ok) {
    //     console.log("Archivo(s) subido(s) con éxito");
    //   } else {
    //     console.error("Error al subir el archivo");
    //   }
    // });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      <p>
        Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
        archivos
      </p>
    </div>
  );
};

export default DropImage;
