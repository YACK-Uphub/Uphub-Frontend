import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/images/logo.png";

const ULogo = () => {
  return (
      <div>
        <Link href={"/"}>
          <Image src={logo}
                 alt={"Uphub Logo"}
                 quality={80}
                 loading={"lazy"}
          />
        </Link>
      </div>
  );
};

export default ULogo;
