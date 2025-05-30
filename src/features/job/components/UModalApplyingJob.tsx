import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Job} from '@/types/job';
import UButton from "@/components/shared/UButton";
import {Label} from "@/components/shadcn/label";
import UInput from "@/components/shared/UInput";
import Image from "next/image";
import {Company} from "@/types/company";

// Define Zod schema for form validation
const ApplicationFormSchema = z.object({
  name: z.string().min(1, 'Họ và tên là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
  experience: z.string().min(1, 'Vui lòng nhập kinh nghiệm'),
  linkedInUrl: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
  portfolioUrl: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
  coverLetter: z.string().optional(),
  address: z.string().max(500, 'Địa chỉ tối đa 500 ký tự').optional(),
  preferredLocations: z.array(z.string()).optional(),
});

type ApplicationFormValues = z.infer<typeof ApplicationFormSchema>;

export type UModalApplyingJobProps = {
  job: Job;
  company: Company;
  onCloseModal?: () => void;
};

export const UModalApplyingJob = ({job, company, onCloseModal}: UModalApplyingJobProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      experience: '',
      linkedInUrl: '',
      portfolioUrl: '',
      coverLetter: '',
      address: '',
      preferredLocations: [],
    },
  });

  const onSubmit = (data: ApplicationFormValues) => {
    console.log('Submitting application:', data);
    onCloseModal?.();
  };

  const locations = ['Location 1', 'Location 2', 'Location 3'];

  return (
      <div className="max-w-2xl mx-auto p-6">
        {/* Job Header */}
        <div className="border-b border-gray-200 pb-4 mb-6 flex items-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full">
            <Image
                src={company.imageUrl}
                alt="company image"
                quality={50}
                loading="lazy"
                fill
                objectFit={"cover"}
                priority={false}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
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
                name="name"
                control={control}
                render={({field}) => (
                    <UInput
                        id="name"
                        label="Họ và tên"
                        field={field}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <UInput
                        id="email"
                        label="Email"
                        type="email"
                        field={field}
                    />
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
                      />
                  )}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Thông tin khác</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="coverLetter">Cover letter hoặc câu hỏi khác</Label>
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
                {errors.coverLetter && (
                    <p className="text-red-500 text-sm">{errors.coverLetter.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address">Địa chỉ (Tối đa 500 chữ)</Label>
                <Controller
                    name="address"
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
                {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Bằng việc nộp đơn, bạn đã đồng ý với Chính sách bảo mật và Điều khoản sử dụng của chúng tôi.
            </p>

            <div className="flex justify-end gap-3">
              <UButton
                  onClick={onCloseModal}
                  label="Hủy"
                  backgroundColor="bg-gray-100"
                  textColor="text-gray-800"
                  border="border border-gray-300"
              />
              <UButton
                  isSubmitFormButton={true} // true to make zod + react form enaable
                  label="Nộp Đơn"
                  backgroundColor="bg-blue-600"
                  textColor="text-white"
              />
            </div>
          </div>
        </form>
      </div>
  );
};
