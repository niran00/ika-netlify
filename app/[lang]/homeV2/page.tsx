


import React from "react";
import HomepageClient2 from "@/components/page-components/homepage2Client";
import { Metadata } from "next"
import HomepageClient from "@/components/page-components/homepageClient";


// ✅ Server Component: receives params, fetches on server, no hooks.
export default async function HomepageV2() {
  return (
        
        <>
        <style>{`
        .header1 {
          display: none !important;
        }
        .header2 {
          display: block !important;
        }
      `}</style>
        <HomepageClient></HomepageClient>
        </>
  );
}
