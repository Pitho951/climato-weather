



import { Home } from "@/app/components/home";

export default async function Page() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather/Santos`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return <Home city={data.city} />;

  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);

    // Você pode renderizar uma tela de erro customizada ou redirecionar
    return <div>Erro ao carregar dados. Tente novamente mais tarde.</div>;
  }
}


export type CurrentCityType = {
  name: string,
  country: string,
  temp: TempType,
  clouds: ListCloudType,
  weather: WeatherType,
  list: ListType[]
}

export type ListType = {
  dayDescription: string;
  temp_max: number;
  temp_min: number;
  hours: {
    hour: string,
    clouds: ListCloudType,
    weather: WeatherType,
    temp: TempType
  }[]
}

export type ListCloudType = {
  all: number
}

export type WeatherType = {
  id: number
  icon: string,
  description: string,
  wind: {
    deg: number,
    gust: number,
    speed: number
  }
}

export type TempType = {
  current: number,
  min: number,
  max: number
}