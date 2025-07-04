'use client'

import { useEffect, useRef } from 'react'
import Typewriter from 'typewriter-effect/dist/core'

export default function Entrytyper({ onTypingDone }) {
  const typewriterRef = useRef(null)

  useEffect(() => {
    if (typewriterRef.current) {
      const typewriter = new Typewriter(typewriterRef.current, {
        autoStart: false,
        loop: false,
        cursor: '',
        delay: 50,
        deleteSpeed: 0,
      })

      typewriter
        .typeString(
          'Leverage our advanced AI-powered search to effortlessly explore our extensive range of laboratory products and discover the ideal solutions tailored to your specific needs.'
        )
        .callFunction(() => {
          if (onTypingDone) onTypingDone()
        })
        .start()
    }
  }, [onTypingDone])

  return <div className="text-2xl font-medium" ref={typewriterRef} />
}