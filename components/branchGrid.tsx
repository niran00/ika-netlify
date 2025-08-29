import Image from "next/image"
import { Card, CardContent } from "./ui/card"

export default function BranchGrid() {
  const branches = [
    {
      name: "Lab",
      image: "/lab-technology.png",
      description: "IKA laboratory technology offers a wide range of innovative equiment for applications in research and development.",
    },
    {
      name: "Process",
      image: "/process-technology.png",
      description: "The Process Technology division of IKA offers turnkey solutions and state-of-the art manufacturing options.",
    },
    {
      name: "EV Battery",
      image: "/ev-battery-solution.png",
      description: "IKA provides scalable and efficient machinery solutions to solve complex chanllenges in EV battery manufacturing.",
    },
    {
      name: "BioProcessing",
      image: "/bioprocessing-solution.png",
      description: "We develop integrated solutions to meet our customer's evolving needs in the bioprocessing industry.",
    },
    
  ]

  return (
    <>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-center text-center bg-white rounded-lg"
          >
            <div className="w-full h-75 overflow-hidden rounded-md">
              <img
                src={branch.image || "/placeholder.svg"}
                alt={branch.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm leading-relaxed text-[#464646]">
              {branch.description}
            </p>
          </div>
        ))}
      </div>

     

    </>
    
  )
}
