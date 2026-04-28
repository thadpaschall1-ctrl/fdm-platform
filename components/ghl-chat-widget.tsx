"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * GHL chat widget loader — only attaches the script on pages where we want
 * the chat icon to appear. Suppressed on /examples/[slug] showcase routes
 * where the floating chrome (Preview pill, Tour, FAQ, Voice section, back-link)
 * already covers prospect questions; the GHL widget would conflict visually
 * with those pills and cover them.
 *
 * On non-showcase routes, the widget loads normally and its floating button
 * appears in the bottom-right.
 *
 * If a visitor navigates client-side from another route into /examples/[slug],
 * the GHL DOM nodes that were already injected stay around — so we also apply
 * a CSS rule via `data-hide-ghl` on the body to hide them. The pathname check
 * sets that attribute when on a showcase route.
 */

export function GHLChatWidget() {
  const pathname = usePathname() ?? "";
  const isShowcase = /^\/examples\/[^/]+$/.test(pathname);

  useEffect(() => {
    // Toggle a body data attribute that CSS keys off to hide the GHL elements
    if (isShowcase) {
      document.body.setAttribute("data-hide-ghl", "1");
    } else {
      document.body.removeAttribute("data-hide-ghl");
    }
  }, [isShowcase]);

  if (isShowcase) return null;

  return (
    <script
      src="https://beta.leadconnectorhq.com/loader.js"
      data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="67e5cb8c14647189c01cde65"
      async
    />
  );
}
