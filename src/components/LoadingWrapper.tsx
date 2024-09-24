"use client";
import { useState, useEffect } from "react";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="mx-2 flex h-screen items-center justify-center">
        <div className="relative flex h-screen w-full flex-col items-center justify-end overflow-hidden">
          <div className="relative flex h-screen w-full items-center justify-center rounded-lg bg-white p-6 shadow-lg">
            <div className="relative h-24 w-24 animate-spin rounded-full border-4 border-orange-500 border-l-gray-200">
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
