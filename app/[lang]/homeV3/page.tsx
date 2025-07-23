


import React from "react";
import HomepageClient2 from "@/components/page-components/homepage2Client";
import HomepageClientV2 from "@/components/page-components/homepageClientV2";
import HomepageClientV3 from "@/components/page-components/homepageClientV3";


// ✅ Server Component: receives params, fetches on server, no hooks.
export default async function HomepageV2() {

  // ✅ Render plain JSX — no useState/useEffect needed
  return (
      <>
        <HomepageClientV2></HomepageClientV2>
        <HomepageClientV3></HomepageClientV3>
      </ >
  );
}
