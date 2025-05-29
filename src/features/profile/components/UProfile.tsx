"use client";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/shadcn/form";
import UInput from "@/components/shared/UInput";
import {Button} from "@/components/shadcn/button";
import {Label} from "@/components/shadcn/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shadcn/select";

const FormSchema = z.object({
    firstname: z.string().nonempty("Vui lòng nhập tên của bạn"),
    lastname: z.string().nonempty("Vui lòng nhập họ của bạn"),
    biography: z.string().nonempty("Vui lòng nhập tiểu sử của bạn"),
    school: z.string().nonempty("Vui lòng chọn trường của bạn"),
    industry: z.string().nonempty("Vui lòng chọn chuyên môn của bạn"),
    socialLinks: z.array(z.string().url("URL không hợp lệ")),
});

export default function UProfile() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            biography: "",
            school: "",
            industry: "",
            socialLinks: [""],
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast({
        //     content: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // });
    }

    return (
            <div className="px-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Họ */}
                            <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <UInput id="firstname" field={field} label="Họ" showLabel/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                    )}
                            />

                            {/* Tên */}
                            <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <UInput id="lastname" field={field} label="Tên" showLabel/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                    )}
                            />

                            {/* Trường học */}
                            <FormField
                                    control={form.control}
                                    name="school"
                                    render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="grid w-full items-center gap-1.5">
                                                        <Label htmlFor="school">Trường học</Label>
                                                        <Select onValueChange={field.onChange}
                                                                defaultValue={field.value}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Chọn..."/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="vietnam">Việt Nam</SelectItem>
                                                                <SelectItem value="other">Khác</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                    )}
                            />
                            {/* Lĩnh vực */}
                            <FormField
                                    control={form.control}
                                    name="industry"
                                    render={({field}) => (
                                            <FormItem className="w-full h-max">
                                                <FormControl>
                                                    <div className="grid w-full items-center gap-1.5">
                                                        <Label htmlFor="industry">Lĩnh vực</Label>
                                                        <Select onValueChange={field.onChange}
                                                                defaultValue={field.value}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Chọn..."/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="vietnam">Việt Nam</SelectItem>
                                                                <SelectItem value="other">Khác</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                    )}
                            />
                        </div>

                        {/* Tiểu sử */}
                        <div>
                            <FormField
                                    control={form.control}
                                    name="biography"
                                    render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <UInput id="biography" field={field} label="Tiểu sử" showLabel/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                    )}
                            />
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full md:w-auto bg-custom-blue-2">
                                Lưu thay đổi
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
    );
}
