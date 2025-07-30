import Image from "next/image"

export default function IndustryGrid() {
  const industries = [
    {
      name: "Pharma",
      image: "/industy/pharma_140_140.jpg",
      description: "Advanced pharmaceutical solutions",
    },
    {
      name: "Chemistry",
      image: "/industy/chemie_140_140.jpg",
      description: "Innovative chemical processes",
    },
    {
      name: "Food",
      image: "/industy/food_140_140.jpg",
      description: "Food processing excellence",
    },
    {
      name: "Cosmetics",
      image: "/industy/cosmetics_140_140.jpg",
      description: "Beauty & cosmetics innovation",
    },
    {
      name: "Bitumen",
      image: "/industy/bitumen_140_140.jpg",
      description: "Advanced bitumen processing",
    },
    {
      name: "Electrosynthesis",
      image: "/industy/elektrosynthese_140_140.jpg",
      description: "Cutting-edge electrochemical synthesis",
    },
    {
      name: "Petrochemistry",
      image: "/industy/petrochemie_140x140.jpg",
      description: "Petrochemical excellence",
    },
    {
      name: "Fuel Cell / Electrolyser",
      image: "/industy/Fuel-Cell_140x140.jpg",
      description: "Clean energy technology",
    },
    {
      name: "Battery Cells",
      image: "/industy/EV-Battery_140x140.jpg",
      description: "Next-generation energy storage",
    },
  ]

  return (
    <div className="w-full pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {industries.map((industry, index) => (
          <div key={index} className="group relative overflow-hidden rounded-xl aspect-[3/2] cursor-pointer">
            <Image
              src={industry.image || "/placeholder.svg"}
              alt={industry.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{industry.name}</h3>
              <p className="text-sm md:text-base opacity-90 font-medium">{industry.description}</p>
            </div>

            {/* Hover effect - subtle border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-xl transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  )
}
