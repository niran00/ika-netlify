"use client";


import React from 'react';
import { useEffect, useState } from 'react';

function LanguageDetector() {
  const [browserLanguage, setBrowserLanguage] = useState(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)


  useEffect(() => {
    // Check if window object is available (client-side)
    if (typeof window !== 'undefined') {
      setBrowserLanguage(navigator.language || navigator.userLanguage);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (err) => {
        setError(err.message)
      }

      

    )

    console.log(location);
  }, [])

  const [country, setCountry] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
   fetch("https://ipapi.co/json/")
   .then((response ) => response.json())
   .then((data) => setCountry(data.country)) // "TH", "US", etc.
   .catch(() => setError("Failed to detect country"))
  }), [];

  return (
    <div>
      {browserLanguage ? (
        <p>Your browser language is: {country} OR  {browserLanguage}</p>
      ) : (
        <p>Detecting browser language...</p>
      )}
    </div>
  );
}

export default LanguageDetector;