"use client";
import UButton from "@/components/shared/UButton";
import { UModalWrapper } from "@/components/shared/UModalWrapper";
import Image from "next/image";
import React from "react";

type UImageUploadModalProps = {
  imagePreviewUrl: string;
  onClose: () => void;
  onSave: () => void;
};

export default function UImageUploadModal({ imagePreviewUrl, onClose, onSave }: UImageUploadModalProps) {
  return (
    <UModalWrapper onCloseModal={onClose}>
      <div className="flex flex-col items-center justify-center space-y-6">
        <h2 className="text-xl font-semibold text-custom-blue-2">Xem trước Logo</h2>

        <div className="relative w-[300px] h-[300px] rounded-lg border shadow overflow-hidden">
          <Image
            src={imagePreviewUrl}
            alt="Preview"
            fill
            quality={50}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholderImage.png"
            className="object-cover"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <UButton label="Lưu" onClick={onSave} backgroundColor="bg-custom-yellow-3" textColor="text-custom-blue-2" />
          <UButton label="Hủy" onClick={onClose} backgroundColor="bg-blue-50" textColor="text-custom-blue-2" />
        </div>
      </div>
    </UModalWrapper>
  );
}
