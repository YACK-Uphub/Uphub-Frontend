import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import UButton from "../UButton";

export interface USearchProps {
  onSearchSubmitAction: (searchTerm: string) => void;
}

export default function USearch({ onSearchSubmitAction }: USearchProps) {
  const [keyword, setKeyword] = useState<string>("");
  /**
   * Handle submission on search and filter
   */
  const handleSubmission = () => {
    onSearchSubmitAction(keyword);
  };

  return (
    <div className="flex border max-w-5xl flex-wrap items-center gap-4 rounded-full px-2 py-1 shadow-xl bg-custom-white md:flex-nowrap md:px-4 md:py-2">
      {/* Job Search Input - Shrinks */}
      <div className="flex min-w-0 items-center gap-2 flex-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-custom-blue-3" />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Tìm kiếm tại đây..."
          className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
        />
      </div>

      {/* Search Button */}
      <UButton
        onClick={handleSubmission}
        label="Tìm Kiếm"
        textColor="text-custom-white"
        backgroundColor="bg-custom-blue-2"
        borderRadius="rounded-full"
      />
    </div>
  );
}
