"use client";

import * as React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import UButton from "@/components/shared/UButton";
import {Label} from "@/components/shadcn/label";
import UInput from "@/components/shared/UInput";
import {toast} from "react-toastify";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";
import {useCreateJobMutation} from "@/services/jobsApi";
import {formatISO} from "date-fns";
import {Controller, useForm} from "react-hook-form";
import {Job} from "@/types/job";

// 1) Zod schema (exactly as before)
const CreateJobSchema = z.object({
  Title: z.string().min(1, "Tiêu đề là bắt buộc"),
  Description: z.string().optional().or(z.literal("")),
  Requirements: z.string().optional().or(z.literal("")),
  ClosingDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {message: "Ngày hết hạn không hợp lệ"}),
  SalaryRange: z.string().min(1, "Mức lương là bắt buộc"),
  Count: z.number().min(0, "Số lượng phải là số >= 0"),
  IsFeatured: z.boolean().optional().default(false),
  IsHighlighted: z.boolean().optional().default(false),
  ContactEmail: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  ContactPhone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => val === "" || /^[0-9()+\- ]+$/.test(val), {
        message: "Số điện thoại không hợp lệ",
      }),
  CompanyId: z.number().min(1, "ID Công ty là bắt buộc"),
  JobTypeId: z.number().min(1, "Loại công việc là bắt buộc"),
  IndustryId: z.number().min(1, "Ngành nghề là bắt buộc"),
  SkillIds: z.array(z.number()).optional().default([]),
});

type CreateJobFormValues = z.infer<typeof CreateJobSchema>;

// 2) Dummy lists (replace with real API data if needed)
const ALL_JOB_TYPES = [
  {id: 1, label: "Full-Time"},
  {id: 2, label: "Part-Time"},
  {id: 3, label: "Internship"},
  {id: 4, label: "Thực tập"},
];
const ALL_INDUSTRIES = [
  {id: 1, label: "Công nghệ thông tin"},
  {id: 2, label: "Marketing"},
  {id: 9, label: "Sales"},
];
const ALL_SKILLS = [
  {id: 1, label: "JavaScript"},
  {id: 2, label: "TypeScript"},
  {id: 3, label: "React"},
  {id: 4, label: "Node.js"},
  {id: 5, label: "Python"},
];

const UCreateJobForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<CreateJobFormValues>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      Title: "",
      Description: "",
      Requirements: "",
      ClosingDate: formatISO(new Date(), {representation: "date"}),
      SalaryRange: "",
      Count: 0,
      IsFeatured: false,
      IsHighlighted: false,
      ContactEmail: "",
      ContactPhone: "",
      CompanyId: 0,
      JobTypeId: 0,
      IndustryId: 0,
      SkillIds: [],
    },
  });

  const [createJob, {isLoading, isError}] = useCreateJobMutation();

  const onSubmit = async (data: CreateJobFormValues) => {
    try {
      const payload: Partial<Job> = {
        title: data.Title,
        description: data.Description || "",
        requirements: data.Requirements || "",
        closingDate: data.ClosingDate,
        salaryRange: data.SalaryRange,
        count: data.Count,
        isFeatured: data.IsFeatured,
        isHighlighted: data.IsHighlighted,
        contactEmail: data.ContactEmail || "",
        contactPhone: data.ContactPhone || "",
        companyId: data.CompanyId,
        jobTypeId: data.JobTypeId,
        industryId: data.IndustryId,
        skillIds: data.SkillIds,
      };

      await createJob(payload).unwrap();
      toast.success("Tạo việc làm thành công!");
      reset();
    } catch (err: any) {
      toast.error(err.data?.message || "Đã xảy ra lỗi khi tạo việc làm");
    }
  };

  if (isLoading) {
    return <UPageSpinner/>;
  }

  return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Tạo việc làm mới</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* SECTION 1: Thông tin cơ bản */}
          <div className="border border-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Thông tin cơ bản</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                  name="Title"
                  control={control}
                  render={({field}) => (
                      <UInput id="Title" label="Tiêu đề *" field={field} error={errors.Title?.message}/>
                  )}
              />
              <Controller
                  name="Count"
                  control={control}
                  render={({field}) => (
                      <UInput
                          id="Count"
                          label="Số lượng"
                          type="number"
                          field={{
                            ...field,
                            value: field.value.toString(),
                            onChange: (e) => field.onChange(Number(e.target.value)),
                          }}
                          error={errors.Count?.message}
                      />
                  )}
              />
              <Controller
                  name="ClosingDate"
                  control={control}
                  render={({field}) => (
                      <UInput
                          id="ClosingDate"
                          label="Ngày hết hạn *"
                          type="date"
                          field={field}
                          error={errors.ClosingDate?.message}
                      />
                  )}
              />
              <Controller
                  name="SalaryRange"
                  control={control}
                  render={({field}) => (
                      <UInput
                          id="SalaryRange"
                          label="Mức lương *"
                          field={field}
                          error={errors.SalaryRange?.message}
                      />
                  )}
              />
            </div>
          </div>

          {/* SECTION 2: Mô tả & Yêu cầu */}
          <div className="border border-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Mô tả & Yêu cầu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                  name="Description"
                  control={control}
                  render={({field}) => (
                      <div>
                        <Label htmlFor="Description">Mô tả công việc</Label>
                        <textarea
                            {...field}
                            id="Description"
                            rows={4}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Nhập mô tả..."
                        />
                        {errors.Description && (
                            <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>
                        )}
                      </div>
                  )}
              />
              <Controller
                  name="Requirements"
                  control={control}
                  render={({field}) => (
                      <div>
                        <Label htmlFor="Requirements">Yêu cầu công việc</Label>
                        <textarea
                            {...field}
                            id="Requirements"
                            rows={4}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Nhập yêu cầu..."
                        />
                        {errors.Requirements && (
                            <p className="text-red-500 text-sm mt-1">{errors.Requirements.message}</p>
                        )}
                      </div>
                  )}
              />
            </div>
          </div>

          {/* SECTION 3: Thông tin liên hệ */}
          <div className="border border-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Thông tin liên hệ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                  name="ContactEmail"
                  control={control}
                  render={({field}) => (
                      <UInput
                          id="ContactEmail"
                          label="Email liên hệ"
                          type="email"
                          field={field}
                          error={errors.ContactEmail?.message}
                      />
                  )}
              />
              <Controller
                  name="ContactPhone"
                  control={control}
                  render={({field}) => (
                      <UInput
                          id="ContactPhone"
                          label="Số điện thoại"
                          type="tel"
                          field={field}
                          error={errors.ContactPhone?.message}
                      />
                  )}
              />
            </div>
          </div>

          {/* SECTION 4: Phân loại */}
          <div className="border border-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Phân loại</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Controller
                  name="CompanyId"
                  control={control}
                  render={({field}) => (
                      <div>
                        <Label htmlFor="CompanyId">ID Công ty *</Label>
                        <select
                            id="CompanyId"
                            value={field.value}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          <option value={0}>Chọn Công ty</option>
                          <option value={9}>9 – Công ty C</option>
                        </select>
                        {errors.CompanyId && (
                            <p className="text-red-500 text-sm mt-1">{errors.CompanyId.message}</p>
                        )}
                      </div>
                  )}
              />

              <Controller
                  name="JobTypeId"
                  control={control}
                  render={({field}) => (
                      <div>
                        <Label htmlFor="JobTypeId">Loại công việc *</Label>
                        <select
                            id="JobTypeId"
                            value={field.value}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          <option value={0}>Chọn loại</option>
                          {ALL_JOB_TYPES.map((jt) => (
                              <option key={jt.id} value={jt.id}>
                                {jt.label}
                              </option>
                          ))}
                        </select>
                        {errors.JobTypeId && (
                            <p className="text-red-500 text-sm mt-1">{errors.JobTypeId.message}</p>
                        )}
                      </div>
                  )}
              />

              <Controller
                  name="IndustryId"
                  control={control}
                  render={({field}) => (
                      <div>
                        <Label htmlFor="IndustryId">Ngành nghề *</Label>
                        <select
                            id="IndustryId"
                            value={field.value}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          <option value={0}>Chọn ngành</option>
                          {ALL_INDUSTRIES.map((ind) => (
                              <option key={ind.id} value={ind.id}>
                                {ind.label}
                              </option>
                          ))}
                        </select>
                        {errors.IndustryId && (
                            <p className="text-red-500 text-sm mt-1">{errors.IndustryId.message}</p>
                        )}
                      </div>
                  )}
              />
            </div>
          </div>

          {/* SECTION 5: Kỹ năng */}
          <div className="border border-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Kỹ năng</h2>
            <Controller
                name="SkillIds"
                control={control}
                render={({field}) => (
                    <div className="flex flex-wrap gap-3">
                      {ALL_SKILLS.map((skill) => {
                        const isChecked = field.value.includes(skill.id);
                        return (
                            <label key={skill.id} className="inline-flex items-center gap-2">
                              <input
                                  type="checkbox"
                                  value={skill.id}
                                  checked={isChecked}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (e.target.checked) {
                                      field.onChange([...(field.value || []), val]);
                                    } else {
                                      field.onChange((field.value || []).filter((v) => v !== val));
                                    }
                                  }}
                                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-200"
                              />
                              <span className="text-gray-700">{skill.label}</span>
                            </label>
                        );
                      })}
                    </div>
                )}
            />
            {errors.SkillIds && (
                <p className="text-red-500 text-sm mt-1">{errors.SkillIds.message}</p>
            )}
          </div>

          {/* SECTION 6: Feature & Highlight (card‐style) */}
          <div className="border border-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Tùy chọn hiển thị</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ── Featured Card ── */}
              <Controller
                  name="IsFeatured"
                  control={control}
                  render={({field}) => {
                    const selected = field.value;
                    return (
                        <div
                            onClick={() => field.onChange(!selected)}
                            className={`
                      cursor-pointer
                      border rounded-lg p-4 flex items-start gap-3
                      ${selected
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300 bg-white hover:border-gray-400"}
                    `}
                        >
                          {/* Left: a simple icon placeholder */}
                          <div
                              className={`
                        h-10 w-10 flex-shrink-0 rounded-full
                        ${selected ? "bg-blue-600" : "bg-gray-200"}
                      `}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => field.onChange(!selected)}
                                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-200"
                              />
                              <span
                                  className={`font-medium ${
                                      selected ? "text-blue-800" : "text-gray-800"
                                  }`}
                              >
                          Đẩy tin lên đầu
                        </span>
                            </div>
                            <p className="mt-1 text-gray-600 text-sm">
                              Công việc của bạn sẽ luôn hiển thị ở vị trí đầu tiên để thu hút nhiều ứng viên hơn.
                            </p>
                          </div>
                        </div>
                    );
                  }}
              />

              {/* ── Highlighted Card ── */}
              <Controller
                  name="IsHighlighted"
                  control={control}
                  render={({field}) => {
                    const selected = field.value;
                    return (
                        <div
                            onClick={() => field.onChange(!selected)}
                            className={`
                      cursor-pointer
                      border rounded-lg p-4 flex items-start gap-3
                      ${selected
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-300 bg-white hover:border-gray-400"}
                    `}
                        >
                          {/* Left: a simple icon placeholder */}
                          <div
                              className={`
                        h-10 w-10 flex-shrink-0 rounded-full
                        ${selected ? "bg-yellow-500" : "bg-gray-200"}
                      `}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => field.onChange(!selected)}
                                  className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-200"
                              />
                              <span
                                  className={`font-medium ${
                                      selected ? "text-yellow-800" : "text-gray-800"
                                  }`}
                              >
                          Làm nổi bật công việc
                        </span>
                            </div>
                            <p className="mt-1 text-gray-600 text-sm">
                              Công việc của bạn sẽ được đánh dấu bằng màu sắc nổi bật, giúp thu hút sự chú ý.
                            </p>
                          </div>
                        </div>
                    );
                  }}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="border-t border-gray-200 pt-4 flex justify-end gap-4">
            <UButton
                onClick={() => reset()}
                label="Hủy"
                backgroundColor="bg-gray-200"
                textColor="text-gray-700"
                border="border border-gray-300"
            />
            <UButton
                isSubmitFormButton={true}
                label="Tạo công việc"
                backgroundColor="bg-blue-600"
                textColor="text-white"
            />
          </div>

          {isError && (
              <p className="text-red-500 text-sm mt-2">
                Đã xảy ra lỗi khi tạo việc làm. Vui lòng thử lại.
              </p>
          )}
        </form>
      </div>
  );
};

export default UCreateJobForm;
