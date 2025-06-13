import React from "react";
import {Input} from "../shadcn/input";
import {Label} from "../shadcn/label";
import {ControllerRenderProps, FieldValues, Path} from "react-hook-form";

type Props = {
  id: string;
  label: string;
  type?: string;
  showLabel?: boolean;
  field: ControllerRenderProps<FieldValues, Path<FieldValues>>;
  error?: string;
};

export default function UInput({label, showLabel = true, type, field, id, error}: Props) {
  return (
      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          {showLabel && <Label htmlFor={label}>{label}</Label>}
          <Input {...field} id={id} type={type || "text"} className="w-full"/>
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
      </div>
  );
}
