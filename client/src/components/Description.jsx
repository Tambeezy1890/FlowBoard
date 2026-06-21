import { ListSortDescending } from "lucide-react";
import React from "react";

function Description() {
  return (
    <div className="mt-4">
      <div className="flex text-white gap-3">
        {" "}
        <ListSortDescending /> Description
      </div>
      <div className="border border-slate-200 mt-4 ml-4">
        <textarea
          name=""
          id=""
          rows={4}
          cols={160}
          placeholder="Add a more detailed description"
          className="w-full bg-transparent outline-none resize-none p-2"
        />
      </div>
    </div>
  );
}

export default Description;
