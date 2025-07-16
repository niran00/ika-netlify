'use client';

import { useEffect, useRef } from 'react';

import { Button } from './ui/button';
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Leaf, Recycle, Battery, Award, Trophy, FlaskRoundIcon as Flask, Cog, Dna } from "lucide-react"

export default function OverlappingSectionsB() {
  const panelsRef = useRef<HTMLElement[]>([]);
  const setPanelRef =
    (index: number) =>
    (el: HTMLElement | null) => {
      if (el) panelsRef.current[index] = el;
    };

  useEffect(() => {
    const panels = panelsRef.current;

    const handleScroll = () => {
      panels.forEach((panel, i) => {
        const next = panels[i + 1];
        if (!next) {
          panel.style.transform = 'scale(1)';
          return;
        }

        const nextTop = next.getBoundingClientRect().top;
        const panelHeight = panel.offsetHeight;
        const progress = 1 - Math.min(Math.max((nextTop - 24) / panelHeight, 0), 1);
        const scale = 1 - progress * 0.2;

        panel.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="stack">
        {/* --------- Panel 1 --------- */}
        <section ref={setPanelRef(0)} className="panel panelA shadow-lg bg-gray-50">
          <div className="content">
            <img src="/placeholder.svg" alt="Product 1" />
            <div className="text">
              <h2>Dummy Section 1</h2>
              <p>Engineered for precision and scalability in every lab setting.</p>
              <button>Learn More</button>
            </div>
          </div>
        </section>

        {/* --------- Panel 2 --------- */}
        <section style={{background: "#f5f5f7"}} ref={setPanelRef(1)} className="panel shadow-lg panelB ">
          <div className="content">
            <img src="/placeholder.svg" alt="Product 2" />
            <div className="text">
              <h2>Dummy Section 2</h2>
              <p>Reduce waste and enhance efficiency with our sustainable designs.</p>
              <button>Learn More</button>
            </div>
          </div>
        </section>

        {/* --------- Panel 3 --------- */}
        <section ref={setPanelRef(2)} className="panel panelC shadow-lg bg-gray-50">
          <div className="content">
            <img src="/placeholder.svg" alt="Product 3" />
            <div className="text">
              <h2>Dummy Section 3</h2>
              <p>Reduce waste and enhance efficiency with our sustainable designs</p>
              <button>Learn More</button>
            </div>
          </div>
        </section>

        {/* --------- Panel 4 --------- */}
        <section  style={{background: "#F4F2EE"}}  ref={setPanelRef(3)} className="panel shadow-lg panelD">
          <div className="content">
            <img src="/placeholder.svg" alt="Product 4" />
            <div className="text">
              <h2>Dummy Section 4</h2>
              <p>Reduce waste and enhance efficiency with our sustainable designs.</p>
              <button>Learn More</button>
            </div>
          </div>
        </section>

        {/* --------- Panel 5 --------- */}
         <section style={{margin : "0px", width : "100%", borderRadius: "0px"}} ref={setPanelRef(4)} className="panel panelE bg-white">
          <div className="content">
            <div className="text">
              <h2>Our Services</h2>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        :global(*) {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        :global(body) {
          overflow-x: hidden;
          font-family: sans-serif;
        }

        .stack {
          padding: 24px;
          position: relative;
        }

        .panel {
          height: 80vh;
          width: calc(100vw - 48px);
          margin: 0 auto;
          border-radius: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: sticky;
          top: 24px;

          transform-origin: top center;
          will-change: transform;
          transition: transform 0.12s linear;
          overflow: hidden;
        }

        .content {
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 32px;
          width: 100%;
          max-width: 1000px;
        }

        .content img {
          height: 300px;
          width: auto;
          border-radius: 12px;
          object-fit: contain;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          background: #fff;
        }

        .text {
          flex: 1;
        }

        .text h2 {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .text p {
          font-size: 18px;
          margin-bottom: 16px;
        }

        .text button {
          background: white;
          color: black;
          font-weight: bold;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .text button:hover {
          background: rgba(255, 255, 255, 0.85);
        }

        .panelA { z-index: 0; }
        .panelB { z-index: 1;  }
        .panelC { z-index: 2; }
        .panelD { z-index: 3; }
        .panelE { z-index: 4; }
      `}</style>
    </>
  );
}
