"use client";

import Link from "next/link";

export default function JobPage() {
  return (
    <main className="min-h-screen job-page">
      <div className="mosaic-back-link">
        <Link href="/">← Back</Link>
      </div>
      <div className="job-content">
        <h1 className="job-title">Job</h1>
        <button type="button" className="job-start-btn">
          Start job
        </button>
      </div>
    </main>
  );
}
