"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import UButton from "@/components/shared/UButton";
import { UBusinessApplicationList } from "@/features/application/components/UBusinessApplicationList";
import { setSearchTerm } from "@/features/application/slices/applicationSlice";
import UJobDetails from "@/features/job/components/UJobDetails";
import { useAppDispatch, useAppSelector } from "@/libs/rtk/hooks";
import { ApplicationStatus } from "@/types/application";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const dispatch = useAppDispatch();

  return (
    <div>
      <UJobDetails id={Number(jobId)} />
      <div>
        {/* Filter Area */}
        <section className={"py-10 px-12 xl:px-0"}>
          <div className={"mx-auto max-w-7xl flex justify-between items-center"}>
            <h2 className={"font-bold text-xl text-custom-blue-2"}>Các đơn ứng tuyển</h2>
            <div className={"flex gap-4"}>
              <Select onValueChange={(val) => dispatch(setSearchTerm(val === "All" ? "" : val))}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Tất cả</SelectItem>
                  <SelectItem value={ApplicationStatus.Applied}>Chờ xử lý</SelectItem>
                  <SelectItem value={ApplicationStatus.Hired}>Đã tuyển</SelectItem>
                  <SelectItem value={ApplicationStatus.Rejected}>Từ chối</SelectItem>
                  <SelectItem value={ApplicationStatus.Interviewed}>Đã phỏng vấn</SelectItem>
                  <SelectItem value={ApplicationStatus.Scheduled}>Đã hẹn lịch</SelectItem>
                </SelectContent>
              </Select>
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
