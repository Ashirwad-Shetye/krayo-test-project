import { downloadFile, getAllFile } from "@/services/apiCalls";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineFileDownload, MdOutlineRefresh } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

function Files() {
  const { user } = useUser();
  const [userId, setUserId] = useState<string>("");
  const [files, setFiles] = useState<any[]>([]);
  const keyRef = useRef();

  useEffect(() => {
    if (user) {
      setUserId(user?.id);
    }
  }, [user, userId]);

  const filterName = (str: string) => {
    return str.split("/")[1].split("-").splice(1).join("-");
  };

  const filterDate = (str: string) => {
    return str.split("/")[1].split(" ").splice(1, 4).join(" ");
  };

  const [spin, setSpin] = useState(false);

  const handleRefresh = async () => {
    setSpin(true);
    const response = await getAllFile(userId);
    const s3Files = response.data.response.Contents.reverse();
    setFiles(s3Files);
    setSpin(false);
  };

  const handleDownloadFile = async (data: any) => {
    toast.success("Downloading will start shortly");
    const key = data.split("/")[1];
    const response = await downloadFile(userId, key);
    const link = document.createElement("a");
    link.href = response.data.url;
    link.download = key;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative bg-white/5 border  border-slate-300 text-white rounded-lg w-5/6">
      <ToastContainer position="top-right" theme="dark" />
      <div className="bg-white/10 h-16 items-center flex  justify-between">
        <h1 className="pl-12 text-xl font-semibold py-2">Title</h1>
        <button
          onClick={handleRefresh}
          className="mr-14 flex items-center justify-center bg-white/10 rounded-lg px-2 h-10 space-x-1 hover:bg-white/40 duration-150 "
        >
          <MdOutlineRefresh
            className={
              spin ? `animate-spin text-2xl text-white` : `text-2xl text-white`
            }
          />
          <h1>Refresh</h1>
        </button>
      </div>
      <div className="max-h-80 overflow-y-scroll overflow-x-hidden">
        {!files ? (
          <div className="border-b border-slate-300/20 py-4 px-12 flex items-center justify-center">
            <h1 className="flex space-x-12">
              Try refreshing files using the Refresh button
            </h1>
          </div>
        ) : (
          files.map((file: any, id: number) => (
            <div
              key={id}
              className="border-b border-slate-300/20 py-4 px-12 flex items-center justify-between hover:bg-white/10 duration-150"
            >
              <h1 className=" max-w-xl truncate">{filterName(file.Key)}</h1>
              <div className="flex items-center justify-between space-x-20 w-72">
                <h2 className="text-gray-300 font-light tracking-wider">
                  {filterDate(file.Key)}
                </h2>
                <button
                  onClick={() => handleDownloadFile(file.Key)}
                  className="flex items-center justify-center bg-white/10 rounded-full p-2 hover:bg-white/40 duration-150"
                >
                  <MdOutlineFileDownload className="text-xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Files;
