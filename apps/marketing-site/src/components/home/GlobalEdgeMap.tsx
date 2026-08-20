'use client';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useEffect, useState } from 'react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function GlobalEdgeMap() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nodes = [
    { coordinates: [-122.4194, 37.7749], name: "US West (SF)" },
    { coordinates: [-74.0060, 40.7128], name: "US East (NY)" },
    { coordinates: [-0.1276, 51.5072], name: "EU West (London)" },
    { coordinates: [8.6821, 50.1109], name: "EU Central (Frankfurt)" },
    { coordinates: [72.8777, 19.0760], name: "India (Mumbai)" },
    { coordinates: [139.6917, 35.6895], name: "Japan (Tokyo)" },
    { coordinates: [151.2093, -33.8688], name: "Australia (Sydney)" },
    { coordinates: [-46.6333, -23.5505], name: "South America (São Paulo)" },
  ];

  return (
    <section className="py-32 bg-background border-t border-border overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-h2 mb-4">Cached at the Edge.</h2>
          <p className="text-lg text-muted-foreground">We deploy your storefront directly to 300+ global edge nodes. Your customers experience sub-50ms page loads, no matter where they are in the world.</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto flex flex-col md:block items-center">
          <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] bg-transparent flex items-center justify-center overflow-visible relative">
            {isMounted && (
              <ComposableMap 
                projection="geoMercator" 
                projectionConfig={{ scale: 130, center: [0, 30] }}
                className="w-full h-full opacity-60 dark:opacity-40"
                style={{ width: "100%", height: "100%" }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="currentColor"
                        className="text-muted-foreground/30 dark:text-muted-foreground/40 outline-none"
                        stroke="currentColor"
                        strokeWidth={0.5}
                      />
                    ))
                  }
                </Geographies>
                
                {nodes.map((node, i) => (
                  <Marker key={i} coordinates={node.coordinates as [number, number]}>
                    <g transform="translate(-12, -24)">
                      {/* Pulsing ring */}
                      <motion.circle
                        cx="12"
                        cy="24"
                        r="12"
                        fill="none"
                        className="stroke-primary"
                        strokeWidth="2"
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                      />
                      {/* Inner Dot */}
                      <circle cx="12" cy="24" r="4" className="fill-primary" />
                      <circle cx="12" cy="24" r="2" className="fill-background" />
                    </g>
                  </Marker>
                ))}
              </ComposableMap>
            )}
          </div>
           
           {/* Floating Info Box */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="relative md:absolute mt-8 md:mt-0 bottom-0 md:bottom-6 right-auto md:right-6 bg-card/90 backdrop-blur-xl border border-primary/20 p-5 rounded-2xl shadow-2xl flex items-center justify-between sm:justify-start gap-6 w-full sm:w-auto z-20"
           >
             <div>
               <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-success animate-pulse" /> Live Status
               </div>
               <div className="text-3xl font-mono text-foreground font-bold">42<span className="text-muted-foreground text-lg">ms</span></div>
               <div className="text-xs text-muted-foreground mt-1">Average Global TTFB</div>
             </div>
             
             <div className="h-12 w-px bg-border hidden sm:block" />
             
             <div className="hidden sm:block">
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Active Nodes</div>
                <div className="text-2xl font-mono text-foreground font-bold">312</div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
