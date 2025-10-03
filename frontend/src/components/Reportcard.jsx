import React from "react";

const ReportCard = ({ report }) => {
  return (
    <div className="w-full p-2 bg-zinc-950 text-white  shadow-2xl max-h-[70vh]  scrollbar-hide">
      <h2 className="text-lg font-semibold mb-4">Full Report</h2>
      <p className="text-sm whitespace-pre-wrap">{report}</p>
    </div>
  );
};

export default ReportCard;
