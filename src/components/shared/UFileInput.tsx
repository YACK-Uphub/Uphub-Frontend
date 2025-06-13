import React, {useState} from "react";
import {Paperclip} from "lucide-react";

export enum UFileInputType {
  PDF = "application/pdf",
  DOC = ".doc,.docx",
}

interface UFileInputProps {
  label?: string;
  onChange?: (file: File | null) => void;
  fileTypes?: UFileInputType[]; // Optional file types
  error?: string;
}

const UFileInput: React.FC<UFileInputProps> = ({
                                                 label = "Đính kèm tệp",
                                                 onChange,
                                                 fileTypes = [UFileInputType.PDF], // ✅ default to PDF if none provided
                                                 error,
                                               }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : null);
    onChange?.(file);
  };

  const acceptAttr = fileTypes.length > 0 ? fileTypes.join(",") : undefined;

  return (
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-700">{label}</span>

        <div className="flex items-center gap-3">
          <label
              htmlFor="file-upload"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-blue-600 transition hover:bg-blue-100"
          >
            <Paperclip size={16}/>
            <span>Tải lên</span>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept={acceptAttr}
                onChange={handleChange}
            />
          </label>

          {fileName && (
              <span className="max-w-xs truncate text-sm text-gray-600">{fileName}</span>
          )}
        </div>

        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
  );
};

export default UFileInput;
