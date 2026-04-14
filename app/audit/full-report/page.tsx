import { Suspense } from "react";
import { FullReportView } from "@/components/full-report-view";

export default function FullReportPage() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-600 border-t-transparent mb-4" />
              <p className="text-slate-400">Generating your full report…</p>
              <p className="text-xs text-slate-500 mt-2">This may take 30-60 seconds</p>
            </div>
          </div>
        }
      >
        <FullReportView />
      </Suspense>
    </div>
  );
}
