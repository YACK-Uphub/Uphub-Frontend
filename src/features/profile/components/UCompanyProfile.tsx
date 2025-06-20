"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import UButton from "@/components/shared/UButton";

const CompanySchema = z.object({
  logo: z.any().optional(),
  companyName: z.string().nonempty("Vui lòng nhập tên công ty"),
  aboutUs: z.string().optional(),
  organizationType: z.string().optional(),
  industry: z.string().optional(),
  teamSize: z.string().optional(),
  foundedYear: z.string().optional(),
  website: z.string().optional(),
  vision: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export default function UCompanyProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CompanySchema),
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const onSubmit = (data) => {
    console.log("Submitted company profile:", data);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-custom-blue-2 text-center">Hồ sơ công ty</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-10 mt-5 mb-10 w-[900px] border-1 border-custom-blue-1 rounded-2xl shadow-xl"
      >
        {/* Logo */}
        <div className="flex gap-6">
          <img
            src={
              logoPreview ||
              "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2F360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg?alt=media&token=7c06435e-c6be-4d6d-a65e-9df8111b7527"
            }
            alt="Logo Preview"
            className="h-45 w-45 object-contain rounded border"
          />
          <div>
            <label className="block font-medium mb-2">Tải lên Logo</label>
            <Input
              type="file"
              accept="image/*"
              {...register("logo")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setLogoPreview(URL.createObjectURL(file));
                }
              }}
            />
            <p className="text-sm text-gray-500 mt-1">Nên sử dụng ảnh lớn hơn 400px. Tối đa 5MB.</p>
          </div>
        </div>

        {/* Tên công ty và mô tả */}
        <div>
          <label className="block font-medium">Tên công ty</label>
          <Input {...register("companyName")} className="w-full" />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Về chúng tôi</label>
          <Textarea
            {...register("aboutUs")}
            className="w-full"
            rows={4}
            placeholder="Hãy viết vài dòng về công ty..."
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium">Loại hình tổ chức</label>
            <Input {...register("organizationType")} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Ngành nghề</label>
            <Input {...register("industry")} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Quy mô đội ngũ</label>
            <Input {...register("teamSize")} className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Năm thành lập</label>
            <Input type="date" {...register("foundedYear")} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Website công ty</label>
            <Input type="url" {...register("website")} className="w-full" placeholder="https://..." />
          </div>
        </div>

        <div>
          <label className="block font-medium">Tầm nhìn công ty</label>
          <Textarea {...register("vision")} className="w-full" rows={4} />
        </div>

        {/* Địa chỉ, SĐT, Email */}
        <div>
          <label className="block font-medium">Địa chỉ</label>
          <Input {...register("address")} className="w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Số điện thoại</label>
            <Input {...register("phone")} className="w-full" placeholder="Số điện thoại" />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <Input type="email" {...register("email")} className="w-full" placeholder="Địa chỉ email" />
          </div>
        </div>

        <div className="pt-6 flex gap-4">
          <UButton
            isSubmitFormButton
            label="Lưu thông tin"
            backgroundColor="bg-custom-yellow-3"
            textColor="text-custom-blue-2"
          />
          <UButton label="Hủy" backgroundColor="bg-blue-50" textColor="text-custom-blue-2" />
        </div>
      </form>
    </div>
  );
}
