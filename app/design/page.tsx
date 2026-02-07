"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import TaskPreview from "../components/TaskPreview";

const MosaicUpload = dynamic(() => import("../components/MosaicUpload"), {
  ssr: false,
});

export default function DesignPage() {
  const [taskId, setTaskId] = useState<string | null>(null);

  return (
    <main className="min-h-screen design-page-wrap">
      <header className="design-top-bar">
        <Link href="/" className="design-top-bar-back">
          ← Back
        </Link>
        <span className="design-top-bar-brand">Distributed GPU</span>
        <span className="design-top-bar-section">Design</span>
      </header>

      <div className="design-page-enter max-w-6xl mx-auto px-4 mb-6 pt-4">
        <div className="design-task-bar flex flex-wrap gap-3 items-center">
          <span className="design-task-label">View existing task</span>
          <input
            type="text"
            placeholder="Enter Task ID"
            className="flex-1 min-w-[140px]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = (e.target as HTMLInputElement).value.trim();
                if (val) setTaskId(val);
              }
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              const val = input?.value?.trim();
              if (val) setTaskId(val);
            }}
          >
            Load
          </button>
        </div>
      </div>

      <div className="design-page-enter design-page-enter-delay">
        <MosaicUpload onTaskCreated={setTaskId} />
      </div>

      {taskId && (
        <div className="design-page-enter mt-8 max-w-6xl mx-auto px-4">
          <TaskPreview taskId={taskId} />
        </div>
      )}
    </main>
  );
}
