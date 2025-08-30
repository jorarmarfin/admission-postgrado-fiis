import React from "react";
import Image from "next/image";
import ImgUni from "@public/images/logo-uni.png";

export const LogoUni = () => {

    return <Image
        src={ImgUni}
        alt="Logo UNI"
        width={64}
        height={64}
        className="w-14 h-14 object-contain rounded-full"
    />
}