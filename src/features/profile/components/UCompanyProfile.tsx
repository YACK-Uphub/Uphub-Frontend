"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import UButton from "@/components/shared/UButton";
import { useAppSelector } from "@/libs/rtk/hooks";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
  useUploadCompanyImageMutation,
} from "@/services/companiesApi";
import { useGetAllCitiesQuery } from "@/services/citiesApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { toast } from "react-toastify";
import UImageUploadModal from "./UImageUploadModal";
import { useGetAllBusinessTypesQuery } from "@/services/businessTypesApi";

const CompanySchema = z.object({
  companyName: z.string().nonempty("Vui lòng nhập tên công ty"),
  description: z.string().nonempty("Vui lòng nhập mô tả"),
  organizationType: z.string().nonempty("Vui lòng nhập loại hình tổ chức"),
  benefit: z.string().nonempty("Vui lòng nhập quyền lợi"),
  companySize: z.string().nonempty("Vui lòng nhập quy mô công ty"),
  establishedDate: z.string().nonempty("Vui lòng nhập năm thành lập"),
  websiteUrl: z.string().nonempty("Vui lòng nhập website"),
  vision: z.string().nonempty("Vui lòng nhập tầm nhìn"),
  address: z.string().nonempty("Vui lòng nhập địa chỉ"),
  phoneNumber: z.string().nonempty("Vui lòng nhập số điện thoại"),
  email: z.string().nonempty("Vui lòng nhập email"),
  cityId: z.number().min(1, "Vui lòng chọn thành phố"),
  businessTypeId: z.number().min(1, "Vui lòng chọn loại hình kinh doanh"),
});

export default function UCompanyProfile() {
  const auth = useAppSelector((state) => state.auth);
  const { data: company, isLoading } = useGetCompanyByIdQuery(auth.user?.userId, {
    skip: !auth.user?.userId,
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { data: cities } = useGetAllCitiesQuery();
  const { data: businessTypes } = useGetAllBusinessTypesQuery({});

  const [updateCompany] = useUpdateCompanyMutation();
  const [uploadCompanyImage] = useUploadCompanyImageMutation();

  const form = useForm<z.infer<typeof CompanySchema>>({
    resolver: zodResolver(CompanySchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (company && cities && businessTypes) {
      const matchedCity = cities.find((city) => city.name === company.city);
      const matchedBusinessType = businessTypes.data.find((bt) => bt.name === company.businessType);

      form.reset({
        description: company.description,
        address: company.address,
        companyName: company.companyName,
        email: company.email,
        establishedDate: company.establishedDate,
        organizationType: company.organizationType,
        phoneNumber: company.phoneNumber,
        companySize: company.companySize,
        vision: company.vision,
        websiteUrl: company.websiteUrl,
        benefit: company.benefit,
        cityId: matchedCity?.id || 0,
        businessTypeId: (matchedBusinessType?.id as number) || 0,
      });
    }
  }, [company, form, cities, businessTypes]);

  const onSubmit = async (data: z.infer<typeof CompanySchema>) => {
    console.log("submitted data:", data);
    console.log("user id:", auth.user?.userId);
    try {
      const response = await updateCompany({ id: auth.user?.userId, body: { ...data } }).unwrap();
      console.log("Company profile updated successfully:", response);
      toast.success("Company profile updated successfully!");
    } catch (error) {
      toast.error("Fail to update company profile", error);
      console.log("error: ", error);
    }
  };

  const onSaveImage = async () => {
    const formData = new FormData();
    formData.append("CompanyImage", selectedFile);

    try {
      const response = await uploadCompanyImage({ id: company.id, body: formData }).unwrap();
      toast.success("Upload ảnh thành công!");
      setShowImageModal(false);
    } catch (err) {
      toast.error("Upload ảnh thất bại");
      console.error(err);
    }
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
              company?.imageUrl ||
              "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2F360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg?alt=media&token=7c06435e-c6be-4d6d-a65e-9df8111b7527"
            }
            alt="Logo"
            className="h-45 w-45 object-contain rounded border"
          />
          <div>
            <label className="block font-medium mb-2">Tải lên Logo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setShowImageModal(true);
                  setLogoPreview(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <p className="text-sm text-gray-500 mt-1">Nên sử dụng ảnh lớn hơn 400px. Tối đa 5MB.</p>
          </div>

          {showImageModal && logoPreview && (
            <UImageUploadModal
              imagePreviewUrl={logoPreview}
              onClose={() => setShowImageModal(false)}
              onSave={async () => onSaveImage()}
            />
          )}
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
            {...register("description")}
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
            <label className="block font-medium">Loại hình kinh doanh</label>
            <Controller
              name="businessTypeId"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--Chọn loại hình kinh doanh--" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes?.data?.map((businesType) => (
                      <SelectItem key={businesType.id} value={businesType.id.toString()}>
                        {businesType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="block font-medium">Quy mô đội ngũ</label>
            <Input {...register("companySize")} className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Năm thành lập</label>
            <Input type="date" {...register("establishedDate")} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Website công ty</label>
            <Input type="url" {...register("websiteUrl")} className="w-full" placeholder="https://..." />
          </div>
        </div>

        <div>
          <label className="block font-medium">Tầm nhìn công ty</label>
          <Textarea {...register("vision")} className="w-full" rows={4} />
        </div>

        <div>
          <label className="block font-medium">Quyền lợi công ty</label>
          <Textarea {...register("benefit")} className="w-full" rows={4} />
          {errors.benefit && <p className="text-red-500 text-sm">{errors.benefit.message}</p>}
        </div>

        {/* Địa chỉ, SĐT, Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Địa chỉ</label>
            <Input {...register("address")} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Thành phố</label>
            <Controller
              name="cityId"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--Chọn thành phố--" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities?.map((city) => (
                      <SelectItem key={city.id} value={city.id.toString()}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.cityId && <p className="text-red-500 text-sm">{errors.cityId.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Số điện thoại</label>
            <Input {...register("phoneNumber")} className="w-full" placeholder="Số điện thoại" />
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
