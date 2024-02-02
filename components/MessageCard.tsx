"use client";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import { UserData } from "@/utils/types";

const CandidateDetailsModal = dynamic(() => import("./CandidateDetailsModal"));

const MessageCard: FC<{ data: UserData }> = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="rounded-lg drop-shadow-md border-gray-200 bg-white px-4 py-5 sm:px-6 min-w-[194px] sm:min-w-[360px] space-y-4">
        <div className="flex flex-col sm:flex-row min-w-0 gap-4">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-indigo-200">
            <span className="text-xl font-medium leading-none text-gray-700">
              {data.name
                .match(/(\b\S)?/g)
                ?.join("")
                .toUpperCase()}
            </span>
          </span>
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {data.name}
            </p>
            <p className="mt-1 truncate text-xs text-gray-500">{data.email}</p>
            <p className="mt-1 truncate text-xs text-gray-500">{data.phone}</p>
            <p className="mt-1 truncate text-xs text-gray-500">
              {data.location}
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
        details={data}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default MessageCard;
