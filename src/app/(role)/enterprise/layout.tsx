import React, {ReactNode} from "react";

const Layout = ({children}: { children: ReactNode }) => {
  return <div className="mx-auto mt-8 w-fit">{children}</div>;
};

export default Layout;
