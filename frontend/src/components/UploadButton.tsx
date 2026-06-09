"use client";

import { useRef, useState } from "react";
import { api } from "@/services/api";

type Props = {
  onUploadSuccess: (chatId: string) => void;
};

export default function UploadButton({
  onUploadSuccess,
}: Props) {

  const fileRef =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  const [fileName, setFileName] =
    useState("");

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {

      setLoading(true);

      const response =
        await api.post(
          "/upload",
          formData
        );

      onUploadSuccess(
        response.data.chat_id
      );

    } catch (error: any) {

      console.error(error);

      alert(
        error?.response?.data?.detail ||
        "Upload failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="flex items-center gap-2">

      <button
        type="button"
        onClick={() =>
          fileRef.current?.click()
        }
        className="
          text-xl
          hover:scale-110
          transition
          cursor-pointer
        "
        title="Upload PDF"
      >
        📎
      </button>

      <input
        ref={fileRef}
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        hidden
      />

      {loading && (
        <span className="text-sm text-gray-500">
          Uploading...
        </span>
      )}

      {!loading && fileName && (
        <span
          className="
            text-sm
            text-gray-500
            max-w-[140px]
            truncate
          "
        >
          {fileName}
        </span>
      )}

    </div>

  );
}