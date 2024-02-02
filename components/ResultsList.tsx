"use client";
import { FC, useMemo } from "react";
import { UserData } from "@/utils/types";
import MessageCard from "./MessageCard";

const ResultList: FC<{ stringifiedData?: string }> = ({ stringifiedData }) => {
  const data = useMemo(() => {
    if (stringifiedData) {
      const candidatesData = JSON.parse(stringifiedData ?? "[]") as Array<
        Record<string, any>
      >;

      return candidatesData.map((candidate) => ({
        ...candidate,
        workExperiences:
          candidate.workExperiences !== ""
            ? JSON.parse(candidate.workExperiences ?? [])
            : [],
        educations:
          candidate.educations !== ""
            ? JSON.parse(candidate.educations ?? [])
            : [],
      })) as UserData[];
    }
    return [];
  }, [stringifiedData]);

  return (
    <div className="flex flex-col gap-2">
      {data.map((userData, index) => (
        <MessageCard key={index} data={userData} />
      ))}
    </div>
  );
};

export default ResultList;
