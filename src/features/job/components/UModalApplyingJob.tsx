import * as React from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Job} from "@/types/job";
import UButton from "@/components/shared/UButton";
import {Label} from "@/components/shadcn/label";
import UInput from "@/components/shared/UInput";
import Image from "next/image";
import {Company} from "@/types/company";
import UFileInput from "@/components/shared/UFileInput";
import {useCreateApplicationMutation} from "@/services/applicationsApi";
import {toast} from "react-toastify";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";

// Zod schema (excluding file)
const ApplicationFormSchema = z.object({
  fullname: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  experience: z.string().min(1, "Vui lòng nhập kinh nghiệm"),
  linkedInUrl: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
  portfolioUrl: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
  coverLetter: z.string().max(500, "Cover letter tối đa 1000 ký tự").optional(),
  introduction: z.string().max(500, "Giới thiệu tối đa 1000 ký tự").optional(),
});

type ApplicationFormValues = z.infer<typeof ApplicationFormSchema>;
type ExtendedApplicationFormValues = ApplicationFormValues & {
  cvFile?: File | null;
};

export type UModalApplyingJobProps = {
  job: Job;
  company: Company;
  onCloseModal?: () => void;
};

export const UModalApplyingJob = ({job, company, onCloseModal}: UModalApplyingJobProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<ExtendedApplicationFormValues>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      experience: "",
      linkedInUrl: "",
      portfolioUrl: "",
      coverLetter: "",
      introduction: "",
      cvFile: null,
    },
  });

  const [createApplication, {isLoading}] = useCreateApplicationMutation();

  const onSubmit = async (data: ExtendedApplicationFormValues) => {

    // Submit application (will update useid later)
    try {
      const response = await createApplication({...data, jobId: job.id, userId: 1}).unwrap();
      console.log(response);
      toast.success("Bạn đã nộp đơn thành công");
      onCloseModal();
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  };

  // Upload then loading
  if (isLoading) {
    return <UPageSpinner></UPageSpinner>
  }

  return (
      <div className="max-w-2xl mx-auto p-6">
        {/* Job Header */}
        <div className="border-b border-custom-gray/20 pb-4 mb-6 flex items-center gap-4">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full overflow-hidden">
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
            <div className="flex items-center gap-2 text-custom-gray/80 mt-2">
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
          <h2 className="text-xl font-semibold mb-4">Nộp đơn ứng tuyển của bạn</h2>
          <p className="text-gray-600 mb-6">Các thông tin dưới đây là bắt buộc</p>

          {/* Required Information */}
          <div className="space-y-4 mb-8">
            <Controller
                name="fullname"
                control={control}
                render={({field}) => (
                    <UInput id="name" label="Họ và tên" field={field} error={errors.fullname?.message?.toString()}/>
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <UInput id="email" label="Email" type="email" field={field}
                            error={errors.email?.message?.toString()}/>
                )}
            />
            <Controller
                name="phone"
                control={control}
                render={({field}) => (
                    <UInput
                        id="phone"
                        label="Số điện thoại"
                        type="tel"
                        field={field}
                        error={errors.phone?.message?.toString()}
                    />
                )}
            />
            <Controller
                name="experience"
                control={control}
                render={({field}) => (
                    <UInput
                        id="experience"
                        label="Kinh nghiệm"
                        field={field}
                        error={errors.experience?.message?.toString()}
                    />
                )}
            />
          </div>

          {/* Links Section */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">LINKS</h3>
            <div className="space-y-4">
              <Controller
                  name="linkedInUrl"
                  control={control}
                  render={({field}) => (
                      <UInput
                          id="linkedInUrl"
                          label="LinkedIn URL (nếu có)"
                          field={field}
                          error={errors.linkedInUrl?.message?.toString()}
                      />
                  )}
              />
              <Controller
                  name="portfolioUrl"
                  control={control}
                  render={({field}) => (
                      <UInput
                          id="portfolioUrl"
                          label="Portfolio URL"
                          field={field}
                          error={errors.portfolioUrl?.message?.toString()}
                      />
                  )}
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Đính kèm CV (PDF, DOCX, v.v.)</h3>
            <div className={"border w-max p-2 rounded-xl shadow-sm"}>
              <UFileInput label="Tải lên CV" onChange={(file) => setValue("cvFile", file)}/>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Thông tin khác</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="coverLetter" className={"mb-4"}>
                  Cover letter hoặc câu hỏi khác (Tối đa 1000 chữ)
                </Label>
                <Controller
                    name="coverLetter"
                    control={control}
                    render={({field}) => (
                        <textarea
                            {...field}
                            id="coverLetter"
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={4}
                        />
                    )}
                />
                {errors.coverLetter && <p className="text-red-500 text-sm">{errors.coverLetter.message}</p>}
              </div>

              <div>
                <Label htmlFor="address" className={"mb-4"}>
                  Giới thiệu về bản thân (Tối đa 1000 chữ)
                </Label>
                <Controller
                    name="introduction"
                    control={control}
                    render={({field}) => (
                        <textarea
                            {...field}
                            id="address"
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={3}
                            maxLength={500}
                        />
                    )}
                />
                {errors.introduction && <p className="text-red-500 text-sm">{errors.introduction.message}</p>}
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="border-t border-custom-gray/30 pt-4">
            <p className="text-sm text-custom-gray mb-4">
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
                  isSubmitFormButton
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
