'use client'

import { useState } from 'react'
import { urlForImage } from '../../../sanity/lib/image'

interface GalleryImage {
  _key: string;
  caption?: string;
  [key: string]: any;
}

interface ImageCarouselProps {
  images: GalleryImage[];
}

export default function ImageCarousel({ images = [] }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const currentImage = images[currentIndex]
  const imageSrc = urlForImage(currentImage)?.url()

  return (
    <div className="wiki-carousel">
      {/* COUNTER */}
      <div className="wiki-carousel-counter">
        {currentIndex + 1} / {images.length}
      </div>

      {/* MAIN SLIDE VIEW */}
      <div className="wiki-carousel-slide">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={currentImage.caption || `Carousel slide ${currentIndex + 1}`}
            className="wiki-carousel-img"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
              fontStyle: 'italic',
              background: '#222'
            }}
          >
            Unable to load slide image
          </div>
        )}

        {/* BOTTOM CAPTION */}
        {currentImage.caption && (
          <div className="wiki-carousel-caption">
            <p>{currentImage.caption}</p>
          </div>
        )}
      </div>

      {/* NAVIGATION CONTROLS */}
      {images.length > 1 && (
        <>
          <button onClick={handlePrev} className="wiki-carousel-btn prev" aria-label="Previous image">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button onClick={handleNext} className="wiki-carousel-btn next" aria-label="Next image">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* DOTS INDICATORS */}
          <div className="wiki-carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`wiki-carousel-dot ${currentIndex === index ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
