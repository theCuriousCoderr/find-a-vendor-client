import React from "react";

function FormatContentList({ content }: { content: string[] }) {
  return (
    <div>
      <p> {content[0]}</p>
      <ul className="list-disc ml-5 mt-2">
        {(content as string[]).slice(1).map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>{" "}
    </div>
  );
}

export default FormatContentList;
