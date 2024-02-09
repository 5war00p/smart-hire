"use client";
import { Suspense, useEffect, useState } from "react";

export const StreamComp = () => {
  const [convertedText, setConvertedText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/chat-stream", {
        method: "POST",
        body: JSON.stringify({
          chat: [
            {
              role: "user",
              content: "Give me details of a smart python developer",
            },
          ],
        }),
      });

      if (response.ok) {
        // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader
        const reader = response.body?.getReader();

        if (!reader) return;

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          setConvertedText(
            (prev) =>
              (prev += new TextDecoder()
                .decode(value)
                .split("\n")
                .filter((line) => line.trim() !== "")
                .filter((d) => d.length)
                .filter(
                  (d) => JSON.parse(d) && JSON.parse(d).choices[0].delta.content
                )
                .map((data) => JSON.parse(data).choices[0].delta.content)
                .join(""))
          );

          console.log(">>> text", convertedText);
        }
      }
    };

    fetchData().then(console.log);
  }, []);

  return <Suspense>{convertedText}</Suspense>;
};
