import React from "react";
import {Paperclip} from "lucide-react"; // Optional icon (install lucide-react)

interface UFileInputProps {
  label?: string;
  onChange?: (file: File | null) => void;
}

const UFileInput: React.FC<UFileInputProps> = ({label = "Đính kèm tệp", onChange}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

  return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{label}</span>

        <label
            htmlFor="file-upload"
            className="flex items-center gap-2 cursor-pointer border border-dashed border-blue-300 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          <Paperclip size={16}/>
          <span>Tải lên</span>
          <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleChange}
          />
        </label>
      </div>
  );
};

export default UFileInput;
