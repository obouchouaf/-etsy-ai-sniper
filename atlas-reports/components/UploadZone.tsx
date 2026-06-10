"use client";

import { useRef, useState } from "react";

interface UploadZoneProps {
  onUpload: (text: string) => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => onUpload(e.target?.result as string);
    reader.readAsText(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-all duration-200 ${
        dragging ? "border-indigo-400 bg-indigo-500/10" : "border-white/15 hover:border-white/30 hover:bg-white/[0.03]"
      }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
        <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white font-semibold">Drop your YouTube Analytics CSV here</p>
        <p className="text-white/40 text-sm mt-1">or click to browse — supports YouTube Studio export format</p>
      </div>
      <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={onFileChange} />
    </div>
  );
}
