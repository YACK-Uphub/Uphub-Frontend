"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form";
import UInput from "@/components/shared/UInput";
import { Button } from "@/components/shadcn/button";
import { Label } from "@/components/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { Student } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { Link2 } from "lucide-react";
import UButton from "@/components/shared/UButton";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const FormSchema = z.object({
  firstname: z.string().nonempty("Vui lòng nhập tên của bạn"),
  lastname: z.string().nonempty("Vui lòng nhập họ của bạn"),
  biography: z.string().optional(),
  school: z.string().optional(),
  industry: z.string().optional(),
  email: z.string().nonempty("Vui lòng nhập email của bạn"),
  phone: z.string().optional(),
});

export default function UProfile() {
  // TODO: get current student id => get student by id
  const student: Student = {
    code: "SE180542",
    email: "myltse180542@fpt.edu.vn",
    firstname: "My",
    lastname: "Lâm",
    phone: "0123456789",
    socialLink: [{ name: "Github", linkUrl: "http://my-github.com", id: 1 }],
    username: "mylt91",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/teamo%2Fimages%2Fplaceholders%2Ffemale-user.jpg?alt=media",
    industry: "Software engineering",
    school: "FPT University",
    cvUrls: ["http://my-cv", ""],
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: student.firstname,
      lastname: student.lastname,
      biography: student.biography,
      school: student.school,
      industry: student.industry,
      email: student.email,
      phone: student.phone,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
    <div className="px-10">
      <h1 className="text-3xl text-custom-blue-2 pb-3">Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-8 w-2xl">
          {/* Image */}
          <div className="flex items-center flex-col gap-3">
            <div className="relative h-25 w-25 rounded-full overflow-hidden">
              <Image
                src={student.imageUrl}
                alt="Medium Group Image"
                fill={true}
                quality={50}
                loading="lazy"
                objectFit={"cover"}
                priority={false}
                placeholder={"blur"}
                blurDataURL={"/images/placeholderImage.png"}
              />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold">
                {student.lastname} {student.firstname}
              </h2>
              <p className="text-gray-600">{student.code}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Tên */}
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

            {/* Họ */}
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

            {/* Trường học */}
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
            {/* Lĩnh vực */}
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem className="h-max w-full">
                  <FormControl>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="industry">Lĩnh vực</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Software engineering">Software engineering</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tiểu sử */}
          <div>
            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="biography" className={"mb-4"}>
                        Tiểu sử
                      </Label>
                      <textarea
                        {...field}
                        id="biography"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={4}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Links Section */}
          <div className="mt-3 w-full">
            <div className="flex items-center gap-3 align-middle">
              <p className="font-semibold">Social Links</p>
            </div>
            <div className="flex flex-col gap-3 mt-2 w-2/3">
              {student?.socialLink?.length > 0 ? (
                student.socialLink.map((link, index) => (
                  <Link
                    key={index}
                    href={link.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#131516] hover:underline"
                  >
                    <Link2 className="text-gray-500" />
                    {link.name || link.linkUrl}
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 italic">No links added yet</p>
              )}
            </div>
          </div>

          {/* CV Download Button */}
          <p className="font-semibold">Danh sách CV của bạn</p>
          <div className="flex flex-wrap gap-2">
            {student.cvUrls?.map((cvUrl, index) => (
              <UButton
                key={index}
                onClick={() => window.open(cvUrl, "_blank")}
                label={`Tải CV ${index + 1}`}
                backgroundColor="bg-green-600/10"
                textColor="text-green-600"
                border="border border-transparent"
                icon={<DocumentTextIcon className="h-4 w-4" />}
                iconPosition="left"
                width="w-auto"
              />
            ))}
          </div>

          <div>
            <Button type="submit" className="w-full md:w-auto bg-custom-blue-2">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
