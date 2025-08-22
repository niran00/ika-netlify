let country : any;

export function getRegionFromApi(){
    fetch("https://ipapi.co/json/")
   .then((response ) => response.json())
   .catch((err) => err("Failed to detect country"));

   console.log("the country is here " , response.json);


}