import React from "react";
import {Input} from "../shadcn/input";
import {Label} from "../shadcn/label";
import {ControllerRenderProps} from "react-hook-form";

type Props = {
    id: string;
    label: string;
    type?: string;
    showLabel?: boolean;
    field: ControllerRenderProps<any, any>;
};

export default function UInput({label, showLabel = true, type, field, id}: Props) {
    return (
            <div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    {showLabel && <Label htmlFor={label}>{label}</Label>}
                    <Input {...field} id={id} type={type || "text"} className="w-full"/>
                </div>
            </div>
    );
}
