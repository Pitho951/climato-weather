'use client';

import { CurrentCityType } from "@/app/page";
import { getIsMobile, getWeatherPeriod } from "@/app/utils/functions";
import { createContext, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const interval = useRef<NodeJS.Timeout | undefined>(undefined);
    const [isMobile, setIsMobile] = useState(false);
    const [weather, setWeather] = useState<WeatherType>(getWeatherPeriod());
    const [city, setCity] = useState<CurrentCityType | null>(null);

    const updateWeather = useCallback((weather: WeatherType) => {
        setWeather(weather);
    }, []);

    useEffect(() => {
        if (interval.current) {
            clearInterval(interval.current);
        }

        interval.current = setInterval(() => {
            // updateWeather(getWeatherPeriod());
            setIsMobile(getIsMobile);
        }, 1000);

        setTimeout(() => {
            updateWeather("night")
        }, 5000);

        setTimeout(() => {
            updateWeather("day")
        }, 10000);

        setTimeout(() => {
            updateWeather("night")
        }, 15000);

        setTimeout(() => {
            updateWeather("day")
        }, 20000);
        updateWeather(getWeatherPeriod());
    }, []);

    return (
        <AppContext.Provider value={{
            weather,
            isMobile,
            city: city!,
            setCity,
            updateWeather
        }}>
            {
                children
            }
        </AppContext.Provider>
    )
}

type AppContextProps = {
    weather: WeatherType;
    city: CurrentCityType;
    isMobile: boolean;
    updateWeather: (weather: WeatherType) => void;
    setCity: Dispatch<SetStateAction<CurrentCityType | null>>
}

type WeatherType = "day" | "night";

type WeatherConfig = {
    wind: number
}