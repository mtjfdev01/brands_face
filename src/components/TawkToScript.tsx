"use client";

import { useEffect } from "react";
import { getTawkEmbedSrc } from "@/lib/tawk";

const TAWK_SCRIPT_ID = "tawk-embed-script";

/** Loads the official Tawk.to widget once (default launcher + chat UI). */
export default function TawkToScript() {
  useEffect(() => {
    if (document.getElementById(TAWK_SCRIPT_ID)) return;

    const s1 = document.createElement("script");
    s1.id = TAWK_SCRIPT_ID;
    s1.async = true;
    s1.src = getTawkEmbedSrc();
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    const s0 = document.getElementsByTagName("script")[0];
    s0?.parentNode?.insertBefore(s1, s0);
  }, []);

  return null;
}
