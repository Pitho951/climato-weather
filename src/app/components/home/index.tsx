'use client';

import { DaySwiperDescription } from "@/app/components/day-description-swiper";
import { SearchBar } from "@/app/components/search-bar";
import { Skeleton } from "@/app/components/skeleton";
import { Weather } from "@/app/components/weather";
import { AppContext } from "@/app/context/app_context";
import { CurrentCityType } from "@/app/page";
import _ from "lodash";
import { DateTime } from "luxon";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Alert, Button, Collapse, Placeholder } from "react-bootstrap";


export function Home({ city: initialCity }: { city: CurrentCityType }) {

    const {
        weather,
        city,
        setCity
    } = useContext(AppContext);

    const [cityName, setCityName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [cityNotFound, setCityNotFound] = useState("");
    const [currentCity, setCurrentCity] = useState<CurrentCityType>(initialCity);
    const [today] = useState(DateTime.local({ locale: "pt-Br" }));

    const getCityForecast = useCallback(async () => {
        if (cityName.length && cityName !== currentCity?.name) {
            setIsLoading(true);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather/${cityName}`);
                const data = await response.json();

                if (data.status === 200) {
                    setCurrentCity(data.city);
                    setCityName("");
                    setCityNotFound("");
                } else {
                    setCityNotFound(cityName);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [cityName]);

    const display = useMemo(() => {
        return <div className="mb-4 text-center">
            {
                isLoading ?
                    <div className="display m-auto d-flex flex-column align-items-center justify-content-center">
                        <div className="w-100 h-100">
                            <div className="mb-2">
                                <Placeholder xs={4} as="div" />
                            </div>
                            <div className="mb-2">
                                <Placeholder xs={6} as="div" />
                            </div>
                            <Placeholder xs={8} as="div" />
                            <Placeholder xs={10} as="div" />
                        </div>
                    </div>
                    :

                    <div className="display   d-flex flex-column align-items-center justify-content-center  m-auto overflow-hidden">
                        <div className="textShadow">
                            <p className="m-0 fs-5"  >Hoje, {today.toFormat("dd/MM")}</p>
                            <p className="m-0 displayTemp">{Number(currentCity?.temp.current.toFixed(0))}&deg;C</p>
                            <p className={`fs-5 m-0 textShadow `} >Máxima: {Number(currentCity?.temp.max.toFixed(0))}&deg;  Miníma: {Number(currentCity?.temp.min.toFixed(0))}&deg;</p>
                        </div>
                        <div className={`w-100 py-1 mt-1 ${weather === "day" ? "text-black" : "text-white textShadow"}`}>
                            <div className={`d-flex justify-content-center gap-2`} >
                                <span >{_.words(currentCity.weather.description).map(_.capitalize).join(" ")} |</span>
                                <span >Ventos {currentCity.weather.wind.speed}km/h</span>
                                <span >| Nuvens {currentCity.clouds.all}%</span>
                            </div>
                            <div className="d-flex gap-2 justify-content-center">
                                <span className={`m-0`} >Humidade {currentCity.humidity}% |</span>
                                <span className={`m-0`} >S. Térmica {currentCity.feels_like}&deg;C</span>
                            </div>
                        </div>
                    </div>

            }

        </div>

    }, [currentCity, isLoading, weather]);

    useEffect(() => {
        setCity(currentCity);
    }, [currentCity]);

    return (
        city &&
        <React.Fragment>
            <div className={`h-100 d-flex flex-column justify-content-end p-2`} >
                <div className={`infoContainer`}>

                    {display}
                    <div>
                        {
                            currentCity &&
                            <div className="d-flex justify-content-between align-items-end mb-2 ">
                                <p className={`fs-1 m-0 textShadow`}>{currentCity.name} - {currentCity.country}</p>
                                <img src="/assets/images/logo.png" width={80} style={{ borderRadius: 10 }} />
                            </div>
                        }
                        <Collapse in={!!cityNotFound} dimension={"height"}>
                            <div>
                                <Alert variant="warning">Cidade não encontrada &quot;<strong>{cityNotFound}</strong>&quot;</Alert>
                            </div>
                        </Collapse>
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