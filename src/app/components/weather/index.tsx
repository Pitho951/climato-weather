'use client';

import { Cloud } from "@/app/components/cloud";
import { AppContext } from "@/app/context/app_context";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

function WeatherComponent() {
    const {
        weather,
        isMobile
    } = useContext(AppContext);

    const dailyBg = useRef<HTMLImageElement | null>(null);
    const nightBg = useRef<HTMLImageElement | null>(null);

    const [clouds, setClouds] = useState<React.JSX.Element[]>([]);

    const generateClouds = useCallback(() => {
        return Array.from({ length: isMobile ? 5 : 20 }, (_, index) => {
            return <Cloud
                index={index}
                key={`cloud-${index}`}
            ></Cloud>
        })
    }, []);

    useEffect(() => {
        const gClouds = generateClouds();
        setClouds(gClouds);
    }, []);


    return (
        <div className="weatherContainer preventActions">
            {clouds}
            <img className={`sun preventActions ${weather === "day" ? "enter" : "leave"}`} src="/assets/images/sun.webp" />
            <img className={`moon preventActions ${weather === "night" ? "enter" : "leave"}`} src="/assets/images/moon.webp" />

            <img ref={nightBg} className={`cityBackground preventActions`} src="/assets/images/mountains.webp" />
            <img ref={dailyBg} className={`w-100 h-100 weatherBackground preventActions ${weather === 'night' ? 'deactive' : ''}`} src="/assets/images/backgrounds/desktop-morning-background.jpg" />
            <img ref={nightBg} className={`w-100 h-100 weatherBackground preventActions`} src="/assets/images/backgrounds/desktop-night-background.jpg" />
        </div>
    )
}

export const Weather = React.memo(WeatherComponent)