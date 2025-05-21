'use client';

import { Cloud } from "@/app/components/cloud";
import { Moon } from "@/app/components/moon";
import { Sun } from "@/app/components/sun";
import { AppContext } from "@/app/context/app_context";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

function WeatherComponent() {
    const {
        weather,
        city,
        isMobile
    } = useContext(AppContext);

    const dailyBg = useRef<HTMLImageElement | null>(null);
    const nightBg = useRef<HTMLImageElement | null>(null);

    return (
        <div className="weatherContainer preventActions">
            <Clouds isMobile={isMobile} cloudPercent={city.clouds.all} />
            <Sun />
            <Moon />

            <img ref={dailyBg} className={`w-100 h-100 weatherBackground preventActions ${weather === 'night' ? 'deactive' : ''}`} src="/assets/images/backgrounds/desktop-morning-background.jpg" />
            <img ref={nightBg} className={`w-100 h-100 weatherBackground preventActions`} src="/assets/images/backgrounds/desktop-night-background.jpg" />
        </div>
    )
}

export const Weather = React.memo(WeatherComponent)


const Clouds = React.memo(({ isMobile, cloudPercent }: { isMobile: boolean, cloudPercent: number }) => {
    const [clouds, setClouds] = useState<React.JSX.Element[]>([]);

    const generateClouds = useCallback((quantity: number) => {
        const cloudTotal = (Math.floor(quantity) * (cloudPercent / 100));

        return Array.from({ length: quantity }, (_, index) => {
            const show = index < cloudTotal ? true : false;

            return <Cloud
                index={index}
                show={show}
                key={`cloud-${index}`}
            ></Cloud>
        })
    }, [cloudPercent]);

    useEffect(() => {
        const gClouds = generateClouds(isMobile ? 10 : 20);
        setClouds(gClouds);
    }, [generateClouds]);

    return clouds
})