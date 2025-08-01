


import React from "react";
import HomepageClient2 from "@/components/page-components/homepage2Client";
import HomepageClientV5 from "@/components/page-components/homepageClientV5";
import HomepageClientV6 from "@/components/page-components/homepageClientV6";
import HomepageClientV3 from "@/components/page-components/homepageClientV3";


// ✅ Server Component: receives params, fetches on server, no hooks.
export default async function HomepageV2() {

  // ✅ Render plain JSX — no useState/useEffect needed
  return (
      <>
        <HomepageClientV6></HomepageClientV6>
        {/* <HomepageClientV3></HomepageClientV3> */}
      </ >
  );
}
