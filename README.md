# 🌤️ Climato

**Climato** é um aplicativo web simples de clima, desenvolvido como projeto de portfólio. Ele permite buscar cidades e visualizar as condições climáticas em tempo real usando a [OpenWeather API](https://openweathermap.org/api).

![Climato preview](https://climato-weather.vercel.app/assets/images/logo.png) 

---

## 🚀 Tecnologias utilizadas

- Next.js 15  
- React 19  
- TypeScript  
- React Bootstrap  
- Chart.js  
- FontAwesome  
- Lodash  
- Luxon  
- Swiper  
- Framer-Motion
- OpenWeather API  

---

## 📸 Demonstração

Você pode testar o app aqui:  
👉 [https://climato-weather.vercel.app/](https://climato-weather.vercel.app/)

---

## ✨ Funcionalidades

- 🔍 Busca por qualquer cidade do mundo  
- 📡 Dados atualizados a cada 2hr (Limitação da própria API Free do OpenWeather)
- 🌡️ Exibe temperatura, sensação térmica, umidade e condição do tempo  
- 🖼️ Ícones de clima dinâmicos  
- 📊 Gráficos interativos para visualização das informações climáticas  
- 📱 Layout responsivo para desktop e mobile  
- 🏞️ Navegação fluida entre informações usando Swiper  

---

## 🛠️ Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/Pitho951/climato-weather.git climato
cd climato
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
```

3. Configure a variável de ambiente para a API (crie um arquivo .env.local):

```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
OPEN_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
OPEN_WEATHER_API_KEY="your OpenWeather API key"
```

4. Rode o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Abra http://localhost:3000 no navegador.


## 👤 Autor

Feito com ❤️ por [Kaique Fabrício](https://github.com/Pitho951)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
