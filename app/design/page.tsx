"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const MosaicUpload = dynamic(() => import("../components/MosaicUpload"), {
  ssr: false,
});

export default function DesignPage() {
  return (
    <main className="min-h-screen design-page-wrap">
      <div className="mosaic-back-link">
        <Link href="/">← Back</Link>
      </div>
      <MosaicUpload />
    </main>
  );
}
