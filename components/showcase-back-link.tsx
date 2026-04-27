import Link from "next/link";

/**
 * Small floating "Demo by Fast Digital Marketing" pill, fixed in the
 * top-right corner of /examples/[slug] showcase pages.
 *
 * Lets visitors navigate back to FDM without imposing the FDM nav/footer
 * on what is supposed to read as a real customer's standalone website.
 */
export function ShowcaseBackLink() {
  return (
    <Link
      href="/examples"
      className="fixed top-3 right-3 z-[60] rounded-full bg-slate-950/85 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur-md ring-1 ring-white/15 hover:bg-slate-950 hover:text-white transition-all hover:scale-[1.02] shadow-md"
    >
      ← FDM Demo
    </Link>
  );
}
