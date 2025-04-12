"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectClient({ url }: { url: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!url) return;

    const isInternal = url.startsWith("/");

    if (isInternal) {
      router.push(url);
    } else {
      const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
      const finalUrl = hasProtocol ? url : `http://${url}`;
      window.location.href = finalUrl;
    }
  }, [url, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin h-20 w-20 border-4 border-blue-500 rounded-full border-t-transparent mb-4 mx-auto" />
        <p className="text-xl text-gray-800 dark:text-gray-200">Redirecting...</p>
      </div>
    </div>
  );
}
