import React from "react";
import Image from "next/image";

export const Image404 = () => {

    return <Image
        src="/images/404.jpg"
        alt="Imagen de error 404"
        width={100}
        className="object-cover w-full h-full"
    />
}