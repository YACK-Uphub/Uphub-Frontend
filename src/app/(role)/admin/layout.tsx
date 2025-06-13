import React, {ReactNode} from "react";

export default function AdminLayout({
                                      children,
                                    }: Readonly<{
  children: ReactNode;
}>) {
  return (
      <div className="relative">
        <div className="relative mx-auto w-full pb-10">
          <div className="mx-auto mt-8 w-fit">{children}</div>
        </div>
      </div>
  );
}
