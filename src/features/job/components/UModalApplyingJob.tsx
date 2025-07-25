﻿import * as React from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Job} from "@/types/job";
import UButton from "@/components/shared/UButton";
import {Label} from "@/components/shadcn/label";
import UInput from "@/components/shared/UInput";
import Image from "next/image";
import {Company} from "@/types/company";
import UFileInput, {UFileInputType} from "@/components/shared/UFileInput";
import {useCreateApplicationWithFormDataMutation} from "@/services/applicationsApi";
import {toast} from "react-toastify";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";
import {useAppSelector} from "@/libs/rtk/hooks";

// FILE UPLOAD RESTRICTION
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = [UFileInputType.PDF.toString()];

// Zod schema (excluding file)
const ApplicationFormSchema = z.object({
  fullname: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  linkedInUrl: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
  coverLetter: z.string().max(1500, "Cover letter tối đa 1500 ký tự").optional(),
  introduction: z.string().max(1500, "Giới thiệu tối đa 1500 ký tự").optional(),
  CVDocument: z
    .any()
    .refine((file) => file instanceof File, "Vui lòng tải lên CV")
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Kích thước file không được vượt quá 5MB",
    })
    .refine((file) => !file || ACCEPTED_MIME_TYPES.includes(file.type), {
      message: "Chỉ chấp nhận file PDF",
    }),
});

export type UModalApplyingJobProps = {
  job: Job;
  company: Company;
  onCloseModal?: () => void;
};

type ApplicationFormValues = z.infer<typeof ApplicationFormSchema>;

export const UModalApplyingJob = ({ job, company, onCloseModal }: UModalApplyingJobProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      linkedInUrl: "",
      coverLetter: "",
      introduction: "",
      CVDocument: null,
    },
  });

  const [createApplication, { isLoading }] = useCreateApplicationWithFormDataMutation();
  const auth = useAppSelector((state) => state.auth);
  console.log(auth?.user);

  const onSubmit = async (data: ApplicationFormValues) => {
    try {
      // convert data fields to form data
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("linkedInUrl", data.linkedInUrl || "");
      formData.append("coverLetter", data.coverLetter || "");
      formData.append("introduction", data.introduction || "");
      formData.append("jobId", job.id.toString());
      formData.append("userId", auth?.user?.userId);
      if (data.CVDocument instanceof File) {
        formData.append("CVDocument", data.CVDocument);
      }

      const response = await createApplication(formData).unwrap();
      console.log(response);
      toast.success("Bạn đã nộp đơn thành công");
      onCloseModal();
    } catch (error) {
      toast.error(error.status + " " + error.message);
    }
  };

  // Upload then loading
  if (isLoading) {
    return <UPageSpinner></UPageSpinner>;
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      {/* Job Header */}
      <div className="mb-6 flex items-center gap-4 border-b pb-4 border-custom-gray/20">
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full">
          <Image
            src={company.imageUrl}
            alt="company image"
            quality={50}
            loading="lazy"
            fill
            objectFit="cover"
            priority={false}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-custom-gray/80">
            <span>{company.city}</span>
            <span>•</span>
            <span>{job.jobType}</span>
            <span>•</span>
            <span>{job.salaryRange}</span>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4 text-xl font-semibold">Nộp đơn ứng tuyển của bạn</h2>
        <p className="mb-6 text-gray-600">Các thông tin dưới đây là bắt buộc</p>

        {/* Required Information */}
        <div className="mb-8 space-y-4">
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <UInput id="name" label="Họ và tên" field={field} error={errors.fullname?.message?.toString()} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <UInput id="email" label="Email" type="email" field={field} error={errors.email?.message?.toString()} />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <UInput
                id="phone"
                label="Số điện thoại"
                type="tel"
                field={field}
                error={errors.phone?.message?.toString()}
              />
            )}
          />
        </div>

        {/* Links Section */}
        <div className="mb-8">
          <h3 className="mb-4 font-semibold">LINKS</h3>
          <div className="space-y-4">
            <Controller
              name="linkedInUrl"
              control={control}
              render={({ field }) => (
                <UInput
                  id="linkedInUrl"
                  label="LinkedIn URL (nếu có)"
                  field={field}
                  error={errors.linkedInUrl?.message?.toString()}
                />
              )}
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <h3 className="mb-4 font-semibold">Đính kèm CV (PDF, DOCX, v.v.)</h3>
          <div className={"border w-max p-2 rounded-xl shadow-sm"}>
            <Controller
              name="CVDocument"
              control={control}
              render={({}) => (
                <UFileInput
                  label="Tải lên CV"
                  fileTypes={[UFileInputType.PDF]}
                  onChange={(file) => setValue("CVDocument", file)}
                  error={errors.CVDocument?.message?.toString()}
                />
              )}
            ></Controller>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-8">
          <h3 className="mb-4 font-semibold">Thông tin khác</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="coverLetter" className={"mb-4"}>
                Cover letter hoặc câu hỏi khác (Tối đa 1000 chữ)
              </Label>
              <Controller
                name="coverLetter"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="coverLetter"
                    className="w-full rounded border border-gray-300 p-2"
                    rows={4}
                  />
                )}
              />
              {errors.coverLetter && <p className="text-sm text-red-500">{errors.coverLetter.message}</p>}
            </div>

            <div>
              <Label htmlFor="address" className={"mb-4"}>
                Giới thiệu về bản thân (Tối đa 1000 chữ)
              </Label>
              <Controller
                name="introduction"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="address"
                    className="w-full rounded border border-gray-300 p-2"
                    rows={3}
                    maxLength={500}
                  />
                )}
              />
              {errors.introduction && <p className="text-sm text-red-500">{errors.introduction.message}</p>}
            </div>
          </div>
        </div>

        {/* Terms and Submit */}
        <div className="border-t pt-4 border-custom-gray/30">
          <p className="mb-4 text-sm text-custom-gray">
            Bằng việc nộp đơn, bạn đã đồng ý với Chính sách bảo mật và Điều khoản sử dụng của chúng tôi.
          </p>

          <div className="flex justify-end gap-3">
            <UButton
              onClick={onCloseModal}
              label="Hủy"
              backgroundColor="bg-custom-red-bg"
              textColor="text-custom-red-text"
              border="border border-custom-gray"
            />
            <UButton
              isSubmitFormButton={true}
              label="Nộp Đơn"
              backgroundColor="bg-custom-blue-3"
              textColor="text-custom-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
