import React from 'react';

export const LoadingScreen: React.FC<{ message?: string }> = ({
  message = 'Preparing the shoreline...',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#091521] text-[#F8F3E9] px-6"
    >
      {/* Subtle handcrafted shell + shoreline wave SVG */}
      <svg
        width="64"
        height="48"
        viewBox="0 0 64 48"
        fill="none"
        aria-hidden="true"
        className="mb-6 text-[#D8A45B]"
      >
        <path
          d="M32 8C23 8 17 16 17 24C21 26 26 27 32 27C38 27 43 26 47 24C47 16 41 8 32 8Z"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path d="M32 8V27" stroke="currentColor" strokeWidth="1" opacity="0.65" />
        <path d="M25 11L28 26" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M39 11L36 26" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path
          d="M8 36C14 33 20 33 26 36C32 39 38 39 44 36C50 33 54 33 58 35"
          stroke="#E8D6B8"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="animate-wave-slow"
        />
      </svg>

      <p className="font-hand text-2xl text-[#E8D6B8]">{message}</p>
    </div>
  );
};
