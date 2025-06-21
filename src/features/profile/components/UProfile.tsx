"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form";
import UInput from "@/components/shared/UInput";
import { Label } from "@/components/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import Image from "next/image";
import { Edit2, Link2, PlusCircle, Trash2 } from "lucide-react";
import UButton from "@/components/shared/UButton";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import {
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
  useUploadCVMutation,
  useUploadImageMutation,
} from "@/services/studentsApi";
import { useAppSelector } from "@/libs/rtk/hooks";
import { useGetAllIndustriesQuery } from "@/services/industriesApi";
import { Input } from "@/components/shadcn/input";
import { toast } from "react-toastify";
import { Textarea } from "@/components/shadcn/textarea";
import { UPageSpinner } from "@/components/shared/spinner/UPageSpinner";
import UImageUploadModal from "./UImageUploadModal";

const FormSchema = z.object({
  firstName: z.string().nonempty("Vui lòng nhập tên của bạn"),
  lastName: z.string().nonempty("Vui lòng nhập họ của bạn"),
  biography: z.string().optional(),
  school: z.string().optional(),
  industryId: z.number().min(1, "Vui lòng chọn lĩnh vực"),
  email: z.string().nonempty("Vui lòng nhập email của bạn"),
  phoneNumber: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        linkUrl: z.string().url("Đường dẫn không hợp lệ"),
      })
    )
    .optional(),
});

export default function UProfile() {
  const auth = useAppSelector((state) => state.auth);
  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2F225-default-avatar.png?alt=media&token=8e0e5cb2-70e8-48b8-b592-0d1555850297";

  const { data: student, isLoading } = useGetStudentByIdQuery(auth.user?.userId, {
    skip: !auth.user?.userId,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateStudent] = useUpdateStudentMutation();
  const [uploadImage] = useUploadImageMutation();
  const [uploadCv] = useUploadCVMutation();

  //const requestParams: GetAllPaginatedRequestParams = {};
  const { data: industries } = useGetAllIndustriesQuery({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      biography: "",
      school: "FPT University",
      industryId: 1,
      email: "",
      phoneNumber: "",
      socialLinks: [],
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  useEffect(() => {
    if (student) {
      console.log(student);
      reset({
        firstName: student.firstName,
        lastName: student.lastName,
        biography: student.biography,
        school: student.school,
        industryId: student.industryId || 1,
        email: student.email,
        phoneNumber: student.phoneNumber,
        socialLinks: student.socialLinks || [],
      });
    }
  }, [student, reset]);

  // Save data
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await updateStudent({ id: auth.user?.userId, body: { ...data } }).unwrap();
      console.log("student profile updated successfully:", response);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("Đã xảy ra lỗi khi lưu thay đổi.");
    }
  }
  // Upload image
  const onSaveImage = async () => {
    const formData = new FormData();
    formData.append("ProfileImage", selectedFile);

    try {
      await uploadImage({ id: student.id, body: formData }).unwrap();
      toast.success("Upload ảnh thành công!");
      setShowImageModal(false);
    } catch (err) {
      toast.error("Upload ảnh thất bại");
      console.error(err);
    }
  };

  // Upload CV
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("CVDocument", file);

    try {
      await uploadCv({ id: student.id, body: formData }).unwrap();
      toast.success("Tải CV thành công!");
    } catch (err) {
      toast.error("Tải CV thất bại!");
      console.error(err);
    }
    event.target.value = "";
  };

  if (isLoading || !student) return <UPageSpinner />;

  return (
    <div className="px-30 w-full">
      <h1 className="pb-3 text-3xl text-custom-blue-2">Profile</h1>
      <hr className="pb-5" />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-40 w-40 rounded-full group">
                <Image
                  src={student.imageUrl?.trim() !== "" ? student.imageUrl : defaultImageUrl}
                  alt="Avatar"
                  fill
                  quality={50}
                  loading="lazy"
                  objectFit="cover"
                  priority={false}
                  placeholder="blur"
                  blurDataURL="/images/placeholderImage.png"
                  className="object-cover rounded-full"
                />
                {/* Upload Button */}
                <label className="absolute bottom-0 mb-1 cursor-pointer transition-opacity duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setShowImageModal(true);
                        setImagePreview(URL.createObjectURL(file));
                        setSelectedFile(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="bg-white rounded-md p-1 text-sm shadow hover:bg-gray-100 border border-gray-300 flex items-center gap-1">
                    <Edit2 size={5} />
                    <span>Edit</span>
                  </div>
                </label>

                {showImageModal && imagePreview && (
                  <UImageUploadModal
                    imagePreviewUrl={imagePreview}
                    onClose={() => setShowImageModal(false)}
                    onSave={async () => onSaveImage()}
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold">
                  {student.lastName} {student.firstName}
                </h2>
                <p className="text-gray-600">{student.code}</p>
              </div>
            </div>

            <FormField
              control={control}
              name="email"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UInput id="email" field={field} label="Email" showLabel />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Links */}
            <div className="mt-3 w-full">
              <div className="flex items-center gap-3 align-middle">
                <p className="font-semibold">Liên kết mạng xã hội</p>
                <div
                  className="inline-block bg-custom-blue-1 rounded-full p-1 cursor-pointer hover:bg-custom-blue-2"
                  onClick={() => append({ linkUrl: "" })}
                >
                  <PlusCircle size={15} color="white" />
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-3">
                {fields.length > 0 ? (
                  fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={control}
                      name={`socialLinks.${index}.linkUrl`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2 items-center">
                            <Link2 className="text-custom-blue-2" />
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={`Link to social profile ${index + 1}`}
                                className="w-full"
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))
                ) : (
                  <p className="italic text-gray-500">Chưa có liên kết nào</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 align-middle">
              <p className="font-semibold">Danh sách CV của bạn</p>
              <div
                className="inline-block bg-custom-blue-1 rounded-full p-1 cursor-pointer hover:bg-custom-blue-2"
                onClick={handleUploadClick}
              >
                <PlusCircle size={15} color="white" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {student.curriculumVitaes?.map((cv, index) => (
                <UButton
                  key={index}
                  onClick={() => window.open(cv.documentUrl, "_blank")}
                  label={`CV ${index + 1}`}
                  backgroundColor="bg-blue-100"
                  textColor="text-custom-blue-2"
                  border="border border-transparent"
                  icon={<DocumentTextIcon className="h-4 w-4" />}
                  iconPosition="left"
                  width="w-auto"
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UInput id="firstname" field={field} label="Tên" showLabel />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UInput id="lastname" field={field} label="Họ" showLabel />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UInput id="phone" field={field} label="Số điện thoại" showLabel />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="school">Trường học</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FPT University">FPT University</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="industryId"
              render={({ field }) => {
                {
                  console.log(field.value);
                }
                return (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="industryId">Lĩnh vực</Label>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field.value ? field.value.toString() : ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn..." />
                          </SelectTrigger>
                          <SelectContent>
                            {industries?.data?.map((industry) => (
                              <SelectItem key={industry.id} value={industry.id.toString()}>
                                {industry.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="biography" className="mb-4">
                        Tiểu sử
                      </Label>
                      <Textarea {...field} id="biography" className="w-full" rows={4} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <UButton isSubmitFormButton label="Lưu thay đổi" backgroundColor="bg-custom-blue-2" />
          </div>
        </form>
      </Form>
    </div>
  );
}
