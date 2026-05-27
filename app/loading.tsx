'use client'

import React from 'react'

export default function Loading() {
  return (
    <div className="preloader-container">
      {/* Dynamic CSS styles injected inline to ensure immediate rendering before CSS bundles load */}
      <style jsx global>{`
        .preloader-container {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background-color: #f7f5f0; /* Matches --bg-color */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease;
        }

        .preloader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .preloader-logo-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .preloader-glow {
          position: absolute;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(44, 82, 130, 0.12) 0%, rgba(56, 88, 43, 0.08) 50%, rgba(247, 245, 240, 0) 70%);
          filter: blur(25px);
          pointer-events: none;
          z-index: 1;
        }

        .preloader-logo {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          z-index: 3;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          animation: preloader-pulse 2.5s ease-in-out infinite;
        }

        /* Inner dual-tone premium ring spinner */
        .preloader-ring-inner {
          position: absolute;
          width: 116px;
          height: 116px;
          border: 3px solid transparent;
          border-top-color: #2c5282; /* --accent-blue */
          border-bottom-color: #38582b; /* --accent-green */
          border-radius: 50%;
          z-index: 4;
          animation: preloader-spin 1.8s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
        }

        /* Outer accent-orange dashed alignment ring */
        .preloader-ring-outer {
          position: absolute;
          width: 136px;
          height: 136px;
          border: 1px dashed rgba(221, 107, 32, 0.35); /* --accent-orange */
          border-radius: 50%;
          z-index: 2;
          animation: preloader-spin-reverse 8s linear infinite;
        }

        .preloader-text-group {
          text-align: center;
          z-index: 3;
        }

        .preloader-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e1b18; /* --text-primary */
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .preloader-subtitle {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #dd6b20; /* --accent-orange */
          letter-spacing: 0.25em;
          text-transform: uppercase;
          animation: preloader-text-pulse 2s ease-in-out infinite alternate;
        }

        @keyframes preloader-pulse {
          0%, 100% {
            transform: scale(0.96);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 12px 30px rgba(56, 88, 43, 0.15);
          }
        }

        @keyframes preloader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes preloader-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes preloader-text-pulse {
          from {
            opacity: 0.45;
            letter-spacing: 0.22em;
          }
          to {
            opacity: 1;
            letter-spacing: 0.28em;
          }
        }
      `}</style>

      <div className="preloader-wrapper">
        <div className="preloader-logo-wrapper">
          <div className="preloader-glow" />
          <div className="preloader-ring-outer" />
          <div className="preloader-ring-inner" />
          <img 
            src="/logo.png" 
            alt="Devika Project Logo" 
            className="preloader-logo" 
          />
        </div>
        <div className="preloader-text-group">
          <h2 className="preloader-title">Devika Project</h2>
          <p className="preloader-subtitle">A Living Archive</p>
        </div>
      </div>
    </div>
  )
}
