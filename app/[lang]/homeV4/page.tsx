


import React from "react";
import HomepageClient2 from "@/components/page-components/homepage2Client";
import HomepageClientV2 from "@/components/page-components/homepageClientV2";
import HomepageClientV4 from "@/components/page-components/homepageClientV4";

// ✅ Server Component: receives params, fetches on server, no hooks.
export default async function HomepageV2() {
  return (
      <>
        <HomepageClientV2></HomepageClientV2>
        <HomepageClientV4></HomepageClientV4>
      </ >
  );
}
