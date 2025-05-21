import { CurrentCityType, ListType } from "@/app/page";
import { ListEntity, WeatherCity } from "@/app/types";
import _ from "lodash";
import { DateTime } from "luxon";

export function mapCityData(city: WeatherCity, list: ListEntity[]): CurrentCityType {
    const now = DateTime.local();

    const filteredList = list.filter((item) => {
        const date = DateTime.fromSQL(item.dt_txt);

        return date.day !== now.day
    });

    const mappedItems = filteredList.reduce((acc, item) => {
        const date = DateTime.fromSQL(item.dt_txt);
        const dayItem = acc.get(date.day);
        const weather = item.weather[0]

        const hour: (ListType["hours"][number]) = {
            hour: date.toFormat("HH:mm"),
            clouds: item.clouds,
            weather: {
                id: weather.id,
                icon: weather.icon,
                description: _.capitalize(weather.description),
                wind: item.wind
            },
            temp: {
                current: Math.round(item.main.temp),
                max: Math.round(item.main.temp_max),
                min: Math.round(item.main.temp_min)
            }
        }



        if (dayItem) {
            dayItem.hours.push(hour);
            dayItem.temp_max = Math.max(dayItem.temp_max, hour.temp.max);
            dayItem.temp_min = Math.min(dayItem.temp_min, hour.temp.min);

            acc.set(date.day, dayItem);
            return acc;
        }

        const listItem: ListType = {
            temp_max: hour.temp.max,
            temp_min: hour.temp.min,
            dayDescription: `${_.capitalize(date.weekdayShort!)} ${date.toFormat("dd/MM")}`,
            hours: [hour]
        }

        acc.set(date.day, listItem);

        return acc;
    }, new Map() as Map<number, ListType>);

    const cityWeather = city.weather[0];

    return {
        name: city.name,
        country: city.sys.country,
        humidity: city.main.humidity,
        feels_like: Math.round(city.main.feels_like),
        clouds: {
            all: city.clouds.all
        },
        weather: {
            id: cityWeather.id,
            icon: cityWeather.icon,
            description: cityWeather.description,
            wind: city.wind
        },
        temp: {
            current: Math.round(city.main.temp),
            max: Math.round(city.main.temp_max),
            min: Math.round(city.main.temp_min)
        },
        list: Array.from(mappedItems.values())
    }
}

export function getWeatherPeriod() {
    const now = DateTime.local({ zone: "America/Sao_Paulo" });
    const nowFormat = now.toFormat("HH:mm");

    if ((nowFormat >= "18:00" || nowFormat < "06:00")) {
        return "night"
    }

    return "day";
}


export function getIsMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent);
}