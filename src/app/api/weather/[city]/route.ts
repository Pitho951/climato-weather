import { mapCityData } from "@/app/utils/functions";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ city: string }> }
) {
    const { city } = (await params);
    const { OPEN_WEATHER_API_KEY, OPEN_WEATHER_API_BASE_URL } = process.env;
    const forecast = await fetch(`${OPEN_WEATHER_API_BASE_URL}/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`);

    const data = await forecast.json();

    if (data.cod) {
        const codNumber = Number(data.cod);

        if (codNumber === 200) {
            const resCurrentForecast = await fetch(`${OPEN_WEATHER_API_BASE_URL}/weather?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`);
            const currentForecast = await resCurrentForecast.json();

            if (Number(currentForecast.cod) === 200) {
                const city = mapCityData(currentForecast, data.list);

                return NextResponse.json({
                    city
                })
            }
        }
    }
}