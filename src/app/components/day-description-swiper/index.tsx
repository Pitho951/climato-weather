'use client';

import { ListType } from "@/app/page";
import { Chart } from "chart.js/auto";
import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { AppContext } from "@/app/context/app_context";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from "lodash";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


library.add(faCaretUp, faCaretDown);

function DaySwiperDescriptionComponent({
    data
}: DaySwiperDescriptionProps) {
    const {
        weather,
        isMobile
    } = useContext(AppContext);

    const getDayColor = useCallback(() => {
        if (weather === 'day') {
            return {
                borderColor: "orange",
                backgroundColor: "rgb(213, 162, 115)"
            }
        }

        return {
            borderColor: "#0C1832",
            backgroundColor: "rgb(12, 24, 50)"
        }
    }, [weather]);

    const ItemCanvas = ({ hours }: { hours: ListType['hours'] }) => {
        const canvaRef = useRef<HTMLCanvasElement | null>(null);
        const chartRef = useRef<Chart | null>(null);

        const getMaxTemp = useCallback(() => {
            return Math.max(...hours.flatMap(item => item.temp.max))
        }, [hours]);

        const createAChart = useCallback((canva: HTMLCanvasElement) => {
            const ctx = canva.getContext('2d');

            if (ctx) {
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, getDayColor().backgroundColor);
                gradient.addColorStop(1, 'transparent');

                return new Chart(canva, {
                    type: "line",
                    plugins: [
                        ChartDataLabels
                    ],
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            datalabels: {
                                anchor: 'end',
                                align: 'top',
                                color: '#000',
                                font: {
                                    weight: 'bold'
                                },
                                formatter: (value) => `${value}°`
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                grid: {
                                    display: false
                                },
                                max: getMaxTemp() + 0.5
                            }
                        },

                    },
                    data: {
                        labels: hours.map(item => item.hour),
                        datasets: [{
                            label: "Temperatura",
                            data: hours.map(item => item.temp.current),
                            fill: true,
                            backgroundColor: gradient,
                            borderColor: getDayColor().borderColor,
                            tension: 0.3
                        }]
                    }
                });
            }

        }, []);

        useEffect(() => {
            const canva = canvaRef.current;
            if (!chartRef.current) {

                if (canva) {
                    const chart = createAChart(canva);

                    if (chart) {
                        chartRef.current = chart;
                    }
                }
            }

        }, []);

        return <canvas ref={canvaRef} height={isMobile ? 150 : 80}></canvas>
    }

    const SwiperItem = ({ item }: { item: ListType }) => {
        const itemHour = useRef(item.hours[0]);

        return <React.Fragment key={item.dayDescription}>
            <div className="row mb-2">
                <div className={`itemDisplayInfo col-12 col-md-6`}>
                    <div>
                        <h4 className={`textShadow`}>{item.dayDescription} </h4>
                        <div className={`display textShadow d-flex gap-3`}>
                            <span ><FontAwesomeIcon icon={faCaretUp} color="blue" />{item.temp_max}&deg;</span>
                            <span ><FontAwesomeIcon icon={faCaretDown} color="red" />{item.temp_min}&deg;</span>
                        </div>
                    </div>
                    <div className="d-flex align-center justify-content-center w-25"
                    >
                        <img src={`https://openweathermap.org/img/wn/${itemHour.current.weather.icon}.png`} alt="Icone de clima" />
                    </div>
                </div>
                <div className="text-black col-12 col-md-6 gap-2 gap-md-0 d-flex flex-row flex-md-column justify-content-around justify-content-md-center">
                    <p className="m-0 ">{_.words(itemHour.current.weather.description).map(_.capitalize).join(" ")}</p>
                    <p className="m-0 ">Ventos de {itemHour.current.weather.wind.speed}km/h</p>
                    <p className="m-0 ">{itemHour.current.clouds.all}% de nuvens</p>
                </div>
            </div>
            <ItemCanvas hours={item.hours} />
        </React.Fragment>
    }

    const mappedSlides = useMemo(() => {
        return data.map((item, index) => {
            return <SwiperSlide className={`slide`} key={`${index}-${item.dayDescription}`}>
                <SwiperItem item={item} key={item.dayDescription} />
            </SwiperSlide>
        })
    }, [weather, SwiperItem, data]);

    return (
        <Swiper
            modules={[
                Navigation
            ]}
            navigation={true}
            className="h-100"
        >
            {mappedSlides}
        </Swiper>
    )
}

export const DaySwiperDescription = React.memo(DaySwiperDescriptionComponent)


type DaySwiperDescriptionProps = {
    data: ListType[];
}
