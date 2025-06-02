import React, {useState} from "react";
import {Paperclip} from "lucide-react";

interface UFileInputProps {
  label?: string;
  onChange?: (file: File | null) => void;
}

const UFileInput: React.FC<UFileInputProps> = ({label = "Đính kèm tệp", onChange}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
    onChange?.(file);
  };

  return (
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-700">{label}</span>

        <div className="flex items-center gap-3">
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

          {/* Display file name if uploaded */}
          {fileName && (
              <span className="text-sm text-gray-600 truncate max-w-xs">{fileName}</span>
          )}
        </div>
      </div>
  );
};

export default UFileInput;
