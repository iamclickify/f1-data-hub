"use client";

import Image from "next/image";
import { Driver } from "@/types/f1";
import { DRIVER_IMAGES } from "@/lib/openf1";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites";
import { useState,} from "react";

export default function DriverCard({ driver }: { driver: Driver }) {
  const teamColor = driver.team_colour ? `#${driver.team_colour}` : "#E8002D";


const [faved, setFaved] = useState(() =>
  isFavorite("driver", String(driver.driver_number))
);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (faved) {
      removeFavorite("driver", String(driver.driver_number));
    } else {
      addFavorite({
        type: "driver",
        id: String(driver.driver_number),
        name: driver.full_name,
      });
    }
    setFaved(!faved);
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer relative">
      {/* Heart button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all"
        style={{
          backgroundColor: faved ? "#E8002D22" : "rgba(0,0,0,0.6)",
          border: faved ? "1px solid #E8002D60" : "1px solid rgba(255,255,255,0.1)",
        }}
        title={faved ? "Remove from favorites" : "Add to favorites"}
      >
        <span className={`text-base transition-all ${faved ? "text-red-500" : "text-gray-400"}`}>
          {faved ? "♥" : "♡"}
        </span>
      </button>
      {/* Team color bar */}
      <div className="h-0.5 w-full" style={{ backgroundColor: teamColor }} />
      {/* Driver image area */}
      <div
        className="flex justify-center pt-5 pb-2 relative"
        style={{
          background: `radial-gradient(ellipse at top, ${teamColor}15, transparent 70%)`,
        }}
      >
        {driver.headshot_url || DRIVER_IMAGES[driver.driver_number] ? (
          <Image
            src={DRIVER_IMAGES[driver.driver_number] ?? driver.headshot_url}
            alt={driver.full_name}
            width={90}
            height={90}
            className="object-contain relative z-10 w-auto h-auto"
            loading="eager"
            unoptimized
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl">
            👤
          </div>
        )}
      </div>
      {/* Driver info */}
      <div className="px-4 pb-5 text-center">
        <p className="text-gray-600 font-mono text-xs mb-1">
          #{driver.driver_number}
        </p>
        <h3 className="text-white font-bold text-base leading-tight group-hover:text-f1gold transition-colors">
          {driver.full_name}
        </h3>
        <p className="text-xs font-medium mt-1.5" style={{ color: teamColor }}>
          {driver.team_name}
        </p>
      </div>
    </div>
  );
}