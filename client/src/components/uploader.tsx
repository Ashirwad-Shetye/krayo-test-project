"use client";
import React, { useRef, ChangeEvent, useEffect, useState } from "react";
import { GoCloudUpload } from "react-icons/go";
import { useUser } from "@clerk/nextjs";
import { uploadFile } from "@/services/apiCalls";
import { ToastContainer, toast } from "react-toastify";

function Uploader() {
  const fileRef: any = useRef();

  const { user } = useUser();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (user) {
      setUserId(user?.id);
    }
  }, [user]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files == null) {
      return null;
    }
    const file = e.target.files[0];
    const response = await uploadFile({ file, userId });
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    // console.log(response);
  };

  return (
    <>
      <div
        onClick={(event) => {
          event.preventDefault();
          fileRef.current.click();
        }}
        className="bg-white/20 cursor-pointer w-[45%] min-w-[20rem] h-48 mt-20 flex items-center justify-center rounded-lg border-2 border-dashed"
      >
        <div className="text-center flex flex-col items-center space-y-2">
          <GoCloudUpload className="text-slate-300 text-5xl" />
          <h1 className="text-slate-300">Add or Drop files here</h1>
        </div>
      </div>
      <input
        type="file"
        ref={fileRef}
        name="file"
        onChange={handleFileUpload}
        className="hidden"
      />
      <ToastContainer position="top-right" theme="dark" />
    </>
  );
}

export default Uploader;
