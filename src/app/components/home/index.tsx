'use client';

import { DaySwiperDescription } from "@/app/components/day-description-swiper";
import { SearchBar } from "@/app/components/search-bar";
import { Skeleton } from "@/app/components/skeleton";
import { Weather } from "@/app/components/weather";
import { CurrentCityType } from "@/app/page";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import _ from "lodash";


export function Home({ city }: { city: CurrentCityType | null }) {
    const [cityName, setCityName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState<CurrentCityType | null>(city);

    const getCityForecast = useCallback(async () => {
        if (cityName.length) {
            setIsLoading(true);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather/${cityName}`);
                const data = await response.json();
                setCurrentCity(data.city);
                setCityName("");
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [cityName]);

    const display = useMemo(() => {
        if (currentCity) {
            return <div className="mb-5 text-center">
                <div className={`display textShadow text-center `} >
                    <Skeleton isLoading={isLoading} xs={8} lg={2}>
                        <span style={{ fontSize: '4rem' }} >{Number(currentCity.temp.current.toFixed(0))}&deg;C</span>
                    </Skeleton>
                </div>
                <Skeleton isLoading={isLoading} xs={10} lg={4} size="lg">
                    <p className={`fs-5 m-0 textShadow `} >Máxima: {Number(currentCity.temp.max.toFixed(0))}&deg;  Miníma: {Number(currentCity.temp.min.toFixed(0))}&deg;</p>
                </Skeleton>
                <p className={`text-center textShadow`} >{_.words(currentCity.weather.description).map(_.capitalize).join(" ")} | Ventos {currentCity.weather.wind.speed}km/h | Nuvens {currentCity.clouds.all}%</p>
            </div>
        }

        return null;
    }, [currentCity, isLoading]);

    return (
        <React.Fragment>
            <div className={`h-100 d-flex flex-column justify-content-end p-2`} >
                <div className={`infoContainer`}>

                    {display}
                    <div>
                        {
                            currentCity &&
                            <div className="d-flex justify-content-between align-items-end mb-2 ">
                                <p className={`fs-1 m-0 textShadow`}>{currentCity.name} - {currentCity.country}</p>
                                <img  src="/assets/images/logo.png" width={80} style={{ borderRadius: 10}} />
                            </div>
                        }
                        <div className={`d-flex gap-2`}>
                            <div className="flex-grow-1">
                                <SearchBar value={cityName} onChange={(value) => setCityName(value)} onEnter={getCityForecast} />
                            </div>
                            <Button variant="primary" onClick={getCityForecast}>Buscar</Button>
                        </div>
                    </div>
                    <div className={`forecastContainer mt-2`}>
                        <h2 className="text-black text-center fs-5 p-2 m-0">Previsão para os próximos dias</h2>
                        {
                            currentCity?.list ?
                                <DaySwiperDescription
                                    data={currentCity.list}

                                />
                                :
                                <Skeleton isLoading={true} bg="primary" />
                        }
                    </div>
                </div>
            </div>
            <Weather />
        </React.Fragment >
    );
}