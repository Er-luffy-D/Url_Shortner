"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectClient({ url }: { url: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!url) return;

    const isInternal = url.startsWith("/");
    let finalUrl = url;

    if (!isInternal) {
      const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
      if (!hasProtocol) {
        finalUrl = `http://${url}`;
      }
      window.location.href = finalUrl;
    } else {
      router.push(finalUrl);
    }
  }, [url]);

  return (
    <div className="flex h-screen items-center justify-center text-2xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="ml-2 animate-spin h-40 w-40 border-8 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );
}
