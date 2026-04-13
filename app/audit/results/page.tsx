import { Suspense } from "react";
import { AuditResults } from "@/components/audit-results-view";

export default function AuditResultsPage() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mb-4" />
              <p className="text-slate-400">Loading your audit results…</p>
            </div>
          </div>
        }
      >
        <AuditResults />
      </Suspense>
    </div>
  );
}
