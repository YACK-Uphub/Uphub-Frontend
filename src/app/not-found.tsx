// app/not-found/page.tsx
import Link from 'next/link';
import type {Metadata} from 'next';
import UButton from '@/components/shared/UButton';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist',
};

export default function NotFoundPage() {
  return (
      <div className="flex h-full flex-col items-center justify-center px-4 bg-custom-white">
        <h1 className="mb-4 text-4xl font-bold text-custom-blue-3">
          404 | Trang không tồn tại
        </h1>
        <p className="mb-6 text-custom-black">
          Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <UButton
                label="Quay trở lại trang chủ"
                backgroundColor="bg-custom-blue-3"
            />
          </Link>
        </div>
      </div>
  );
}
