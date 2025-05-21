'use client';

import { Cloud } from "@/app/components/cloud";
import { AppContext } from "@/app/context/app_context";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

function WeatherComponent() {
    const {
        weather
    } = useContext(AppContext);

    const dailyBg = useRef<HTMLImageElement | null>(null);
    const nightBg = useRef<HTMLImageElement | null>(null);

    const [clouds, setClouds] = useState<React.JSX.Element[]>([]);

    const generateClouds = useCallback(() => {

        return Array.from({ length: 20 }, (_, index) => {
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
            {
                weather === "day" ?
                    <img className={`sun preventActions`} src="/assets/images/sun.webp" />
                    :
                    <img className={"moon preventActions "} src="/assets/images/moon.webp" />
            }
            <img ref={nightBg} className={`cityBackground preventActions`} src="/assets/images/mountains.webp" />
            <img ref={dailyBg} style={{ opacity: weather === 'day' ? 1 : 0 }} className={`w-100 h-100 weatherBackground preventActions ${weather === 'night' ? 'deactive' : ''}`} src="/assets/images/backgrounds/desktop-morning-background.jpg" />
            <img ref={nightBg} style={{ opacity: weather === 'night' ? 1 : 0 }} className={`w-100 h-100 weatherBackground preventActions`} src="/assets/images/backgrounds/desktop-night-background.jpg" />
        </div>
    )
}

export const Weather = React.memo(WeatherComponent)