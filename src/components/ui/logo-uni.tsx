import React from "react";
import Image from "next/image";

export const LogoUni = () => {

    return <Image
        src="/images/logo-uni.png"
        alt="Logo UNI"
        width={64}
        height={64}
        className="w-14 h-14 object-contain rounded-full"
    />
}