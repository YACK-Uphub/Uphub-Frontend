"use client"

import {useRouter} from "next/navigation";
import UButton from "@/components/shared/UButton";

const Error = ({error, reset}) => {
  const router = useRouter();

  const goBackToHomePage = () => {
    router.push("/");
  }

  return (
      <div className="flex h-full flex-col items-center justify-center px-4 bg-custom-white">
        <h1 className="mb-4 text-4xl font-bold text-custom text-custom-blue-3">Xảy ra lỗi. Vui lòng thử lại</h1>
        <p className="mb-6 text-custom-black">{error.message || 'An unexpected error occurred.'}</p>
        <div className="flex gap-4">
          <UButton
              onClick={goBackToHomePage}
              label={"Quay trở lại trang chủ"}
              backgroundColor={"bg-custom-blue-3"}
          >
          </UButton>

          <UButton
              onClick={() => reset()}
              label={"Thử lại"}
              backgroundColor={"bg-custom-gray"}
          >
          </UButton>
        </div>
      </div>
  );
};

export default Error;
