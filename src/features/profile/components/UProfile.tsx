"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form";
import UInput from "@/components/shared/UInput";
import { Label } from "@/components/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import Image from "next/image";
import Link from "next/link";
import { Edit2Icon, Link2 } from "lucide-react";
import UButton from "@/components/shared/UButton";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useGetStudentByIdQuery } from "@/services/studentsApi";
import { useAppSelector } from "@/libs/rtk/hooks";
import { useGetAllIndustriesQuery } from "@/services/industriesApi";
import { GetAllPaginatedRequestParams } from "@/types/baseModel";
import { SocialLink } from "@/types/user";

const FormSchema = z.object({
  firstname: z.string().nonempty("Vui lòng nhập tên của bạn"),
  lastname: z.string().nonempty("Vui lòng nhập họ của bạn"),
  biography: z.string().optional(),
  school: z.string().optional(),
  industry: z.string().optional(),
  email: z.string().nonempty("Vui lòng nhập email của bạn"),
  phone: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
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
  const requestParams: GetAllPaginatedRequestParams = {};
  const { data: industries } = useGetAllIndustriesQuery(requestParams);
  //console.log(auth.user.userId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      biography: "",
      school: "FPT University",
      industry: "",
      email: "",
      phone: "",
      socialLinks: [],
    },
  });

  useEffect(() => {
    if (student) {
      form.reset({
        firstname: student.firstName,
        lastname: student.lastName,
        biography: student.biography,
        school: student.school,
        industry: student.industry,
        email: student.email,
        phone: student.phoneNumber,
        socialLinks: student.socialLinks || [],
      });
    }
  }, [student, form]);

  if (isLoading || !student) return <div>Đang tải...</div>;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form values:", data);
    // toast({
    //     content: "You submitted the following values:",
    //     description: (
    //         <pre className="mt-2 rounded-md p-4 w-[340px] bg-slate-950">
    //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //         </pre>
    //     ),
    // });
  }

  return (
    <div className="px-10 w-full">
      <h1 className="pb-3 text-3xl text-custom-blue-2">Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Image and Basic Info */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-25 w-25 overflow-hidden rounded-full">
                <Image
                  src={student.imageUrl?.trim() !== "" ? student.imageUrl : defaultImageUrl}
                  alt="Avatar"
                  fill={true}
                  quality={50}
                  loading="lazy"
                  objectFit="cover"
                  priority={false}
                  placeholder="blur"
                  blurDataURL="/images/placeholderImage.png"
                />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold">
                  {student.lastName} {student.firstName}
                </h2>
                <p className="text-gray-600">{student.code}</p>
              </div>
            </div>

            {/* Email */}
            <FormField
              control={form.control}
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UInput id="phone" field={field} label="Số điện thoại" showLabel />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Links */}
            <div className="mt-3 w-full">
              <div className="flex items-center gap-3 align-middle">
                <p className="font-semibold">Liên kết mạng xã hội</p>
                <div className="inline-block bg-custom-blue-1 rounded-full p-1 cursor-pointer hover:bg-custom-blue-2">
                  <Edit2Icon size={15} color="white" />
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-3">
                {(form.watch("socialLinks") || []).length > 0 ? (
                  form.watch("socialLinks").map((link, index) => (
                    <Link
                      key={index}
                      href={link.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-custom-blue-2 hover:underline"
                    >
                      <Link2 className="text-custom-blue-2" />
                      {link.name || link.linkUrl}
                    </Link>
                  ))
                ) : (
                  <p className="italic text-gray-500">No links added yet</p>
                )}
              </div>
            </div>

            {/* CV Buttons */}
            <p className="font-semibold">Danh sách CV của bạn</p>
            <div className="flex flex-wrap gap-2">
              {student.curriculumVitaes?.map((cv, index) => (
                <UButton
                  key={index}
                  onClick={() => window.open(cv.documentUrl, "_blank")}
                  label={`Tải CV ${index + 1}`}
                  backgroundColor="bg-blue-100"
                  textColor="text-custom-blue-2"
                  border="border border-transparent"
                  icon={<DocumentTextIcon className="h-4 w-4" />}
                  iconPosition="left"
                  width="w-auto"
                />
              ))}
            </div>
            <UButton label="Upload" backgroundColor="bg-custom-yellow-3" />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UInput id="firstname" field={field} label="Tên" showLabel />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UInput id="lastname" field={field} label="Họ" showLabel />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School */}
            <FormField
              control={form.control}
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

            {/* Industry */}
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="industry">Lĩnh vực</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn..." />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.data.map((industry) => (
                            <SelectItem key={industry.id} value={industry.name}>
                              {industry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Biography */}
            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="biography" className="mb-4">
                        Tiểu sử
                      </Label>
                      <textarea
                        {...field}
                        id="biography"
                        className="w-full rounded border border-gray-300 p-2"
                        rows={6}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Save Button */}
            <UButton label="Lưu thay đổi" backgroundColor="bg-custom-blue-2" />
          </div>
        </form>
      </Form>
    </div>
  );
}
