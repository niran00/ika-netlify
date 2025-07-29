'use client';

import Image from 'next/image';
import styles from './Slider.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerSlider = ({ slides, onPrevious, onNext }) => {
  const slide = slides[0]; // always a single-item array

  return (
    <div className={`${styles.sliderContainer} relative`}>
      <div className={styles.sliderWrapper}>
        <div className={styles.slide}>
          <Image
            src={slide.image}
            alt={slide.text}
            fill
            className={styles.sliderImage}
            sizes="(max-width: 600px) 100vw, 600px"
          />
          <div className={styles.overlay}>
            <p className={styles.sliderText}>{slide.text}</p>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={onPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default BannerSlider;
