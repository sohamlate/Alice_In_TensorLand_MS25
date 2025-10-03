import React from "react";

const ReportText = () => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 50;

  if (report.length <= maxLength) {
    return <p className="text-gray-300 text-sm mt-2 font-mono">{report}</p>;
  }

  return (
    <p className="text-gray-300 text-sm mt-2 font-mono">
      {expanded ? report : report.substring(0, maxLength) + "..."}{" "}
      <span
        className="text-blue-500 cursor-pointer hover:underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "show less" : "read more"}
      </span>
    </p>
  );
};

export default ReportText;
