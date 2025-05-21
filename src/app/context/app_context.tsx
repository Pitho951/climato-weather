'use client';

import { getIsMobile, getWeatherPeriod } from "@/app/utils/functions";
import { createContext, useCallback, useEffect, useRef, useState } from "react";

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const interval = useRef<NodeJS.Timeout | undefined>(undefined);
    const [isMobile, setIsMobile] = useState(false);
    const [weather, setWeather] = useState<WeatherType>(getWeatherPeriod());

    const updateWeather = useCallback((weather: WeatherType) => {
        setWeather(weather);
    }, []);

    useEffect(() => {
        if (interval.current) {
            clearInterval(interval.current);
        }

        interval.current = setInterval(() => {
            updateWeather(getWeatherPeriod());
            setIsMobile(getIsMobile);
        }, 1000);
    }, []);

    return (
        <AppContext.Provider value={{
            weather,
            isMobile,
            updateWeather
        }}>
            {children}
        </AppContext.Provider>
    )
}

type AppContextProps = {
    weather: WeatherType;
    updateWeather: (weather: WeatherType) => void;
    isMobile: boolean
}

type WeatherType = "day" | "night";