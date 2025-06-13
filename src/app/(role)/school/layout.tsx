import {ReactNode} from "react";

export default function SchoolLayout({
                                       children,
                                     }: Readonly<{
  children: ReactNode;
}>) {
  return (
      <div className="relative">
        <div className="relative mx-auto w-full pb-10">
          {/* <UStudentSearchContainer /> */}
          <div className="mx-auto mt-8 w-fit">{children}</div>
        </div>
      </div>
  );
}
