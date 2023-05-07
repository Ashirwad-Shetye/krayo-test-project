import React from "react";
import { GoCloudUpload } from "react-icons/go";

function Uploader() {
  return (
    <div className="bg-white/20 w-[45%] min-w-[20rem] h-48 mt-20 flex items-center justify-center rounded-lg border-2 border-dashed">
      <div className="text-center flex flex-col items-center space-y-2">
        <GoCloudUpload className="text-slate-300 text-5xl" />
        <h1 className="text-slate-300">Add or Drop files here</h1>
      </div>
    </div>
  );
}

export default Uploader;
