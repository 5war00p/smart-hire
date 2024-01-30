"use client";
import { FC, useState } from "react";
import dynamic from "next/dynamic";

const CandidateDetailsModal = dynamic(() => import("./CandidateDetailsModal"));

const MessageCard: FC<{ details: Record<string, any> }> = ({ details }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="rounded-lg drop-shadow-md border-gray-200 bg-white px-4 py-5 sm:px-6 min-w-[194px] sm:min-w-[360px] space-y-4">
        <div className="flex flex-col sm:flex-row min-w-0 gap-4">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-indigo-200">
            <span className="text-xl font-medium leading-none text-gray-700">
              LM
            </span>
          </span>
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              Linda Moore
            </p>
            <p className="mt-1 truncate text-xs text-gray-500">
              elizabethhernandez53@mail.com
            </p>
            <p className="mt-1 truncate text-xs text-gray-500">
              +1-752-676-3840
            </p>
            <p className="mt-1 truncate text-xs text-gray-500">
              Charlotte, USA
            </p>
          </div>
        </div>
        <div className="flex items-end justify-end">
          <button
            className="text-indigo-600 hover:text-indigo-500"
            onClick={() => setShowDetails(true)}
          >
            {"View details ->"}
          </button>
        </div>
      </div>
      <CandidateDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default MessageCard;
