'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { id: 1, image: '/service/IKA_Service_Hotline.jpg', alt: 'Hotline', text: '24/7 IKA Service Hotline for technical support' },
  { id: 2, image: '/service/IKA_Service_warranty.jpg', alt: 'Service & Warranty', text: 'Extended warranty options and repairs' },
  { id: 3, image: '/service/IKA_Service_Q_C.jpg', alt: 'Calibration & Qualification', text: 'ISO-compliant calibration and certification' },
  { id: 4, image: '/service/IKA_Service_Customizing_Center.jpg', alt: 'Customizing Center', text: 'Customizing Center' },
  { id: 5, image: '/service/IKA_Service_Application-support.jpg', alt: 'Application support', text: 'Application support' },
  { id: 6, image: '/service/IKA_Service_Trial-devices.jpg', alt: 'Trial Devices', text: 'Trail Devices' },
  { id: 7, image: '/service/IKA_Service_FUT.jpg', alt: 'Slide 7', text: 'Additional Service Info 7' },
  { id: 8, image: '/service/IKA_Service_Manuals.jpg', alt: 'Slide 8', text: 'Additional Service Info 8' },
  { id: 9, image: '/service/IKA_Service_Spare-Parts.jpg', alt: 'Slide 9', text: 'Additional Service Info 9' },
  { id: 10, image: '/service/IKA_Service_Training.jpg', alt: 'Slide 10', text: 'Additional Service Info 10' },
];

export default function BannerSliderWithButtons() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => setCurrentIndex(index);
  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const currentSlide = slides[currentIndex];

  return (
    <div className="flex gap-6 h-[500px]">
      {/* Left - Slider */}
      <div className="relative w-3/4 h-full rounded-lg overflow-hidden bg-gray-200">
        <div className="relative aspect-video w-full h-full">

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg">
                  <span className="text-gray-900 font-medium text-sm sm:text-base lg:text-lg">Labratory</span>
                </div>
              </div>

          <Image
            src={currentSlide.image}
            alt={currentSlide.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
            <p className="text-lg font-semibold">{currentSlide.text}</p>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right - Buttons */}
      <div className="w-1/4 h-full overflow-y-auto grid grid-cols-2 gap-3">
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg">
              <span className="text-gray-900 font-medium text-sm sm:text-base lg:text-lg">Labratory</span>
            </div>
          </div>
        {slides.map((slide, index) => (
          <button
          key={slide.id}
          onClick={() => goToSlide(index)}
          className={`relative flex items-center justify-center p-2 rounded-md overflow-hidden transition h-20 ${
            index === currentIndex ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
        
          {/* Overlay: white for inactive, dark for active */}
          <div className={`absolute inset-0 ${index === currentIndex ? 'bg-black/40' : 'bg-white/60'}`} />
        
          {/* Text label */}
          <span
            className={`relative z-10 text-[13px] font-medium text-center px-2 ${
              index === currentIndex ? 'text-white' : 'text-[#00599C]'
            }`}
          >
            {slide.alt}
          </span>
        </button>
        
        ))}

        

      </div>
    </div>
  );
}
