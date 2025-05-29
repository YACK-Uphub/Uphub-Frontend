import * as React from 'react';
import {useEffect} from 'react';
import {XCircleIcon} from "@heroicons/react/24/solid";

export type UModalProps = {
  onCloseModal: () => void;
  children: React.ReactNode;
};

export const UModalWrapper = ({onCloseModal, children}: UModalProps) => {

  // How to remove the scroll bar in website
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [onCloseModal]);

  // Handle clicking on the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCloseModal();
  }

  return (
      <div
          className="fixed inset-0 z-100 flex items-center justify-center
                    backdrop-blur-2xl"
          onClick={handleBackdropClick}>

        <div className="relative rounded-xl overflow-y-auto
                        shadow-lg max-w-4xl max-h-[90vh] p-8 m-8 bg-custom-white">

          {/* Icon */}
          <XCircleIcon
              className="absolute top-1 right-1 h-8 w-8 text-custom-blue-3"
              onClick={onCloseModal}
          />

          {/* Content */}
          {children}
        </div>
      </div>
  );
};
