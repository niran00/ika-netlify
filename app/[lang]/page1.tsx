import React from "react";
import HomepageClient from "@/components/page-components/homepageClient";
import Homepage2Client from "@/components/page-components/homepage2Client";
import Homepage3Client from "@/components/page-components/homepage3Client";
import Homepage4Client from "@/components/page-components/homepage4Client";
import OverlappingSections from "@/components/overlappingSections";


// import {getProducts} from "@/lib/strapi"

export default async function HomePage() {
// export default async function HomePage({params} : {params: {lang: string}}) {
 
  // const lang = params.lang


  //   // Fetch products (already returns an object)
  //   const productsObject = await getProducts(lang)

  //   // Convert object to array for rendering
  //   const productsArray = Object.values(productsObject)

  // This makes loading.tsx show
  return (
    <>
      <Homepage4Client></Homepage4Client>
      
      {/* {productsArray.map((product :any , index) => (
        <div key={index}>
           <h1>{product.PRODUCT_NAME} - <span>{product.PRODUCT_PRICE}</span></h1>
        </div>
      ))} */}

    </>
  )
    
  ;
}