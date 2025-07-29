// "use client"

// import React from "react"
// import Image from "next/image"



// export default function StickyServices({

// }){


//     return (
//     <>

//         <section className="py-20 px-8 bg-white">
//             <div className=" mx-auto mb-5">
//               <div className="flex flex-col lg:flex-row gap-4 items-stretch">

//                 {/* Image + Buttons - 1/4 width on large screens */}
//                 <div className="lg:w-2/5 flex flex-col justify-between mb-5">


//                   <div className=" bg-white header1 border-b bg-black sticky top-40 z-1  top-40 left-0 w-full z-1 transition-opacity duration-30 ">
//                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Engineering</h1>
//                      <div className="text-gray-700 leading-relaxed space-y-4">
//                        <p>In addition to standard machines and units, we offer individual procedural solutions...</p>
//                        <p>Your tasks and process goals are the main priority for our experts...</p>
//                        <p>The desired dispersion degree of a mixture as well as the achieved quality...</p>
//                      </div>
//                   </div>


//                 </div>

//                 {/* Banner Slider - 3/4 width on large screens */}
//                 <div className="lg:w-3/5">
//                     <Image width={1000} height={800} className="rounded-xl" src="/service/IKA_Service_Q_C.jpg" alt="Banner 1" />
//                 </div>


//               </div>
//              </div>

//              <div className=" mx-auto mb-5">
//               <div className="flex flex-col lg:flex-row gap-4 items-stretch">

//                 {/* Image + Buttons - 1/4 width on large screens */}
//                 <div className="lg:w-2/5 flex flex-col justify-between mb-5">


//                   <div className=" bg-white header1 border-b bg-black sticky top-40 z-1  top-40 left-0 w-full z-1 transition-opacity duration-30 ">
//                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Engineering</h1>
//                      <div className="text-gray-700 leading-relaxed space-y-4">
//                        <p>In addition to standard machines and units, we offer individual procedural solutions...</p>
//                        <p>Your tasks and process goals are the main priority for our experts...</p>
//                        <p>The desired dispersion degree of a mixture as well as the achieved quality...</p>
//                      </div>
//                   </div>


//                 </div>

//                 {/* Banner Slider - 3/4 width on large screens */}
//                 <div className="lg:w-3/5">
//                     <Image width={1000} height={800} className="rounded-xl" src="/service/IKA_Service_Q_C.jpg" alt="Banner 1" />
//                 </div>


//               </div>
//              </div>


//              <div className=" mx-auto mb-5">
//               <div className="flex flex-col lg:flex-row gap-4 items-stretch">

//                 {/* Image + Buttons - 1/4 width on large screens */}
//                 <div className="lg:w-2/5 flex flex-col justify-between mb-5">


//                   <div className=" bg-white header1 border-b bg-black sticky top-40 z-1  top-40 left-0 w-full z-1 transition-opacity duration-30 ">
//                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Engineering</h1>
//                      <div className="text-gray-700 leading-relaxed space-y-4">
//                        <p>In addition to standard machines and units, we offer individual procedural solutions...</p>
//                        <p>Your tasks and process goals are the main priority for our experts...</p>
//                        <p>The desired dispersion degree of a mixture as well as the achieved quality...</p>
//                      </div>
//                   </div>


//                 </div>

//                 {/* Banner Slider - 3/4 width on large screens */}
//                 <div className="lg:w-3/5">
//                     <Image width={1000} height={800} className="rounded-xl" src="/service/IKA_Service_Q_C.jpg" alt="Banner 1" />
//                 </div>


//               </div>
//              </div>


               
//       </section>
    
//     </>
//     )
// }




import Image from "next/image"

interface ShowcaseSection {
  id: string
  title: string
  description: string
  number: string
  badge: string
  image: string
}

const sections: ShowcaseSection[] = [
  {
    id: "services",
    title: "Process Services",
    description: ` 
    
        First-rate quality from initial consultation all the way to production

        From the very start of your project IKA has been part of it and assists you during the planning stages through its realization by offering a multitude of services:
        Designing entire production plants
        Performing test runs when developing new products
        Planning and implementing of mechanical, electrical, and pneumatic installations
        Commissioning, including a test processing, and training the operating personnel
        Qualification

        After project completion, our experienced engineers, electricians, chemists, application technicians and assemblers will be available to assist you with:
        Technical advice for questions concerning operation, process, and maintenance of IKA machines and plants
        Spare parts service
        Repair service
        Reconstruction and upgrading`, 
    number: "40",
    badge: "Associates",
    image: "/service/proc_services.jpg" 
  },
  {
    id: "engineering",
    title: "Engineering",
    description:
      `
        In addition to standard machines and units we offer individual procedural solutions for your specialized mixing tasks. Our long-standing experience in machine and plant construction for clients in varying application ranges as well as numerous innovations and advancements are the foundation for a successful collaboration.

        Your tasks and process goals are the main priority for our experts and design engineers. We work with you to determine the criteria that are important for the development of your machine or plant. Meeting specific customer demands such as a design suited for the pharmaceutical industry or an explosion-proof execution is self-evident for us.

        The desired dispersion degree of a mixture as well as the achieved quality and characteristics of the final product are already tested during the development phase at the IKA pilot plant station. We will gladly contribute to the optimization of your production processes and help you to prevent a loss of raw materials, unnecessary energy or time. If you decide on a turn-key plant, we will take care of the basic and detail engineering as well as the necessary coordination with sub-suppliers, including commissioning and training of your employees.

      `,
    number: "200+",
    badge: "Clients",
    image: "/service/proc_engineering.jpg" 
  },
  {
    id: "testcenter",
    title: "Test Center",
    description:
      `From idea to solution

        We work with you to optimize your current mixing tasks or to develop completely new solutions for the production of your products. IKA Test Center allows us to simulate what will be put into effect later in your production process. We will help you determine the deciding parameters necessary to ensure the desired quality of the resulting product.

        IKA Test Center consists of a vast array of different machines and plants, measuring and analytical devices and software. The Test Center has influenced the concept and design of many of our machines and their tools.

        Searching for a suitable machine for your application? At IKA Test Center you can test several mixing systems with a variety of tools. Our chemical engineers look forward to assisting and advising you during and after the experiments. This way an optimal solution for your specific mixing task can be determined.

        You will be surprised at the results that can be achieved with IKA inline systems. Difficult mixing tasks that require multiple steps can be accomplished with a single pass through one system. Our experience, creativity and competence as well as a pleasant working environment will tremendously add to your success.`,
    number: "15",
    badge: "Years",
    image: "/service/proc_technikum.jpg" 
  },
  {
    id: "rental",
    title: "Rental equipment",
    description:
      `
        A genuine IKA production machine is not only supposed to provide outstanding functioning and quality, but it must also be suitable for your particular application and process. Because IKA machines cover such a broad spectrum of applications, we realize that each task requires a unique approach. We also realize the significant investment involved in purchasing production machines and plants.

        IKA trial machines allow for you to preview your machine decision on-site with your specific application. We offer flexible terms for use of our trial equipment: a user-defined term of lease, extension of rental period, and in some cases a credit in the amount of the first rental rate. IKA offers assistance with operating trial machines.

        In the event that new question arises during the experiment, our application support team will be glad to offer you an advice.

        Contact: process@ika.de
      `,
    number: "25+",
    badge: "Services",
    image: "/service/proc_rental.jpg" 
  },
]

function ShowcaseSection({ section, index }: { section: ShowcaseSection; index: number }) {
  return (
    <section className="min-h-70 w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Content - Sticky */}
          <div className="lg:sticky lg:top-80 space-y-6 lg:space-y-8">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl lg:text-3xl font-light text-gray-900">{section.title}</h1>
              <div className="flex space-x-1">
                <div className="w-1 h-6 bg-[#00599C] transform rotate-12"></div>
                <div className="w-1 h-6 bg-[#00599C] transform rotate-12"></div>
                <div className="w-1 h-6 bg-[#00599C] transform rotate-12"></div>
              </div>
            </div>

            {/* Description */}
            {/* <div className="space-y-4">
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">{section.description}</p>
            </div> */}

            {/* Section indicator */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              
            </div>
          </div>

          {/* Right Content - Image with Overlay */}
          <div className="relative lg:min-h-[600px] flex items-start">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl w-full">
              <Image
                src={section.image}
                alt={`${section.title} - ${section.badge}`}
                width={800}
                height={600}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                priority={index === 0}
              />

              {/* Large Number Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-6xl sm:text-8xl lg:text-[10rem] font-bold opacity-90 select-none drop-shadow-2xl">
                  {section.number}
                </span>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg">
                  <span className="text-gray-900 font-medium text-sm sm:text-base lg:text-lg">Process</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function StickyServices() {
  return (
    <div className="bg-gray-50">
      {sections.map((section, index) => (
        <ShowcaseSection key={section.id} section={section} index={index} />
      ))}
    </div>
  )
}
