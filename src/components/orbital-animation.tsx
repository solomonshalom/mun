"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const OrbitalAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Animation logic would go here in a production app
    // This would animate the orbital elements around the center
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* Center cloud character */}
      <div className="relative z-10">
        <Image
          src="/placeholder.svg?height=150&width=150"
          alt="Cloud character"
          width={150}
          height={150}
          className="bg-white rounded-full p-2"
        />
      </div>

      {/* Orbital paths */}
      <div className="absolute w-[300px] h-[300px] border border-dashed border-white/30 rounded-full"></div>
      <div className="absolute w-[450px] h-[450px] border border-dashed border-white/30 rounded-full"></div>
      <div className="absolute w-[600px] h-[600px] border border-dashed border-white/30 rounded-full"></div>

      {/* Orbital elements - these would be animated in a full implementation */}
      <div className="absolute" style={{ top: "40%", left: "35%" }}>
        <div className="bg-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      </div>
      <div className="absolute" style={{ top: "30%", right: "35%" }}>
        <div className="bg-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <path d="M2 3h20" />
            <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
            <path d="m7 21 5-5 5 5" />
          </svg>
        </div>
      </div>
      <div className="absolute" style={{ bottom: "30%", left: "40%" }}>
        <div className="bg-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <rect x="16" y="16" width="6" height="6" rx="1" />
            <rect x="2" y="16" width="6" height="6" rx="1" />
            <rect x="9" y="2" width="6" height="6" rx="1" />
            <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
            <path d="M12 12V8" />
          </svg>
        </div>
      </div>
      <div className="absolute" style={{ bottom: "35%", right: "30%" }}>
        <div className="bg-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
            <path d="m12 12 4 10 1.7-4.3L22 16Z" />
          </svg>
        </div>
      </div>

      {/* Colorful bottom elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 opacity-80"></div>
    </div>
  )
}

export default OrbitalAnimation

