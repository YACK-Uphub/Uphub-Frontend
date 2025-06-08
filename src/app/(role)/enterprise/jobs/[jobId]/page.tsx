"use client";
import UButton from "@/components/shared/UButton";
import { UBusinessApplicationList } from "@/features/application/components/UBusinessApplicationList";
import UJobDetails from "@/features/job/components/UJobDetails";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const { jobId } = useParams();

  return (
    <div>
      <UJobDetails id={Number(jobId)} />
      <div>
        {/* Filter Area */}
        <section className={"py-10 px-12 xl:px-0"}>
          <div className={"mx-auto max-w-7xl flex justify-between items-center"}>
            <h2 className={"font-bold text-xl text-custom-blue-2"}>Các đơn ứng tuyển</h2>
            <div className={"flex gap-4"}>
              <UButton
                label={"Lọc thông minh"}
                backgroundColor={"bg-custom-yellow-3"}
                textColor={"text-custom-blue-3"}
                borderRadius={"rounded-sx"}
                border={"border shadow-1xl"}
                onClick={null}
              />
              <UButton
                label={"Sắp xếp"}
                backgroundColor={"bg-custom-blue-3"}
                textColor={"text-custom-white"}
                borderRadius={"rounded-sx"}
                border={"border"}
                onClick={null}
              />
            </div>
          </div>
        </section>
        <section className={"mx-auto max-w-7xl mb-14"}>
          <div className={"p-10 bg-custom-gray/15"}>
            <UBusinessApplicationList />
          </div>
        </section>
      </div>
    </div>
  );
}
