'use client';

import { getWeatherPeriod } from "@/app/utils/functions";
import { DateTime } from "luxon";
import { createContext, useCallback, useEffect, useRef, useState } from "react";

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const interval = useRef<NodeJS.Timeout | undefined>(undefined);
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
        }, 1000);
    }, []);

    return (
        <AppContext.Provider value={{
            weather,
            updateWeather
        }}>
            {children}
        </AppContext.Provider>
    )
}

type AppContextProps = {
    weather: WeatherType;
    updateWeather: (weather: WeatherType) => void;
}

type WeatherType = "day" | "night";