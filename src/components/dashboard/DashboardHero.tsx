import { useEffect, useState } from "react";

import {
  Clock,
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Sun,
  Wind,
} from "lucide-react";

import { loadCongregationProfile } from "../../features/settings/storage/congregationProfileStorage";

interface DashboardHeroProps {
  greeting: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

interface WeatherState {
  city: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

interface GeocodingResult {
  name?: string;
  latitude?: number;
  longitude?: number;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface WeatherResponse {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    weather_code?: number;
  };
}

function getWeatherDescription(code: number): string {
  if (code === 0) {
    return "Clear sky";
  }

  if (code === 1 || code === 2) {
    return "Partly cloudy";
  }

  if (code === 3) {
    return "Overcast";
  }

  if (code === 45 || code === 48) {
    return "Foggy";
  }

  if (code >= 51 && code <= 57) {
    return "Drizzle";
  }

  if (code >= 61 && code <= 67) {
    return "Rain";
  }

  if (code >= 71 && code <= 77) {
    return "Snow";
  }

  if (code >= 80 && code <= 82) {
    return "Rain showers";
  }

  if (code >= 85 && code <= 86) {
    return "Snow showers";
  }

  if (code >= 95 && code <= 99) {
    return "Thunderstorm";
  }

  return "Current conditions";
}

function WeatherIcon({ code }: { code: number }) {
  if (code === 0) {
    return <Sun size={28} />;
  }

  if (code === 1 || code === 2) {
    return <CloudSun size={28} />;
  }

  if (code === 3) {
    return <Cloud size={28} />;
  }

  if (code >= 51 && code <= 67) {
    return <CloudRain size={28} />;
  }

  if (code >= 80 && code <= 82) {
    return <CloudRain size={28} />;
  }

  return <Cloud size={28} />;
}

const initialWeather: WeatherState = {
  city: "",
  weather: null,
  loading: true,
  error: null,
};

export default function DashboardHero({
  greeting,
}: DashboardHeroProps) {
  const [now, setNow] = useState(() => new Date());

  const [weather, setWeather] =
    useState<WeatherState>(initialWeather);

  /*
   * Live clock
   */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /*
   * Weather
   *
   * Weather is deliberately isolated from
   * the rest of the dashboard. If anything
   * goes wrong, the dashboard continues to
   * render normally.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        let profile;

        try {
          profile = loadCongregationProfile();
        } catch {
          if (!cancelled) {
            setWeather({
              city: "",
              weather: null,
              loading: false,
              error: "Weather is unavailable.",
            });
          }

          return;
        }

        const city =
          typeof profile?.city === "string"
            ? profile.city.trim()
            : "";

        if (!city) {
          if (!cancelled) {
            setWeather({
              city: "",
              weather: null,
              loading: false,
              error: "Add your city in Settings.",
            });
          }

          return;
        }

        if (!cancelled) {
          setWeather({
            city,
            weather: null,
            loading: true,
            error: null,
          });
        }

        /*
         * Geocode city.
         */
        const geoUrl =
          "https://geocoding-api.open-meteo.com/v1/search" +
          `?name=${encodeURIComponent(city)}` +
          "&count=1" +
          "&language=en" +
          "&format=json";

        const geoResponse = await fetch(geoUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!geoResponse.ok) {
          throw new Error("Unable to find city.");
        }

        const geoData =
          (await geoResponse.json()) as GeocodingResponse;

        const location =
          geoData.results?.[0];

        if (
          !location ||
          typeof location.latitude !== "number" ||
          typeof location.longitude !== "number"
        ) {
          throw new Error("City not found.");
        }

        /*
         * Current weather.
         */
        const weatherUrl =
          "https://api.open-meteo.com/v1/forecast" +
          `?latitude=${location.latitude}` +
          `&longitude=${location.longitude}` +
          "&current=temperature_2m" +
          ",relative_humidity_2m" +
          ",weather_code" +
          ",wind_speed_10m" +
          "&temperature_unit=celsius" +
          "&wind_speed_unit=kmh";

        const weatherResponse = await fetch(weatherUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!weatherResponse.ok) {
          throw new Error("Unable to load weather.");
        }

        const weatherData =
          (await weatherResponse.json()) as WeatherResponse;

        const current = weatherData.current;

        if (
          !current ||
          typeof current.temperature_2m !== "number" ||
          typeof current.relative_humidity_2m !== "number" ||
          typeof current.wind_speed_10m !== "number" ||
          typeof current.weather_code !== "number"
        ) {
          throw new Error("Weather data is unavailable.");
        }

        if (cancelled) {
          return;
        }

        setWeather({
          city:
            typeof location.name === "string" &&
            location.name.trim()
              ? location.name
              : city,

          weather: {
            temperature: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            weatherCode: current.weather_code,
          },

          loading: false,
          error: null,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.warn(
          "Weather unavailable:",
          error
        );

        setWeather((previous) => ({
          ...previous,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Weather unavailable.",
        }));
      }
    }

    void loadWeather();

    /*
     * Refresh every 10 minutes.
     */
    const refreshTimer = window.setInterval(() => {
      void loadWeather();
    }, 10 * 60 * 1000);

    return () => {
      cancelled = true;

      window.clearInterval(
        refreshTimer
      );
    };
  }, []);

  const date =
    now.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const time =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const weatherDescription =
    weather.weather
      ? getWeatherDescription(
          weather.weather.weatherCode
        )
      : "";

  return (
    <div
      className="overflow-hidden rounded-3xl shadow-xl"
      style={{
        background:
          "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
      }}
    >
      {/* TOP SECTION */}

      <div className="flex flex-col gap-6 px-8 py-7 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            👋 {greeting}
          </h1>

          <p className="mt-2 text-lg text-blue-100">
            {date}
          </p>

          {weather.city && (
            <div className="mt-3 flex items-center gap-2 text-sm text-blue-100">
              <MapPin size={16} />

              <span>{weather.city}</span>
            </div>
          )}
        </div>

        {/* CLOCK */}

        <div className="text-left md:text-right">
          <div className="flex items-center gap-2 text-blue-100 md:justify-end">
            <Clock size={18} />

            <span className="font-medium">
              Live Time
            </span>
          </div>

          <div className="mt-2 text-3xl font-bold tracking-wide text-white md:text-4xl">
            {time}
          </div>
        </div>
      </div>

      {/* WEATHER */}

      <div
        className="px-8 py-6"
        style={{
          background:
            "rgba(255,255,255,0.10)",
          backdropFilter: "blur(8px)",
          borderTop:
            "1px solid rgba(255,255,255,.15)",
          borderBottom:
            "1px solid rgba(255,255,255,.15)",
        }}
      >
        {weather.loading && (
          <div className="text-blue-100">
            Loading current weather...
          </div>
        )}

        {!weather.loading &&
          weather.error && (
            <div className="text-blue-100">
              <div className="font-medium">
                Weather unavailable
              </div>

              <div className="mt-1 text-sm opacity-80">
                {weather.error}
              </div>
            </div>
          )}

        {!weather.loading &&
          !weather.error &&
          weather.weather && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {/* TEMPERATURE */}

              <div className="flex items-center gap-4">
                <div className="text-blue-100">
                  <WeatherIcon
                    code={
                      weather.weather
                        .weatherCode
                    }
                  />
                </div>

                <div>
                  <div className="text-3xl font-bold text-white">
                    {Math.round(
                      weather.weather
                        .temperature
                    )}
                    °C
                  </div>

                  <div className="text-sm text-blue-100">
                    {weatherDescription}
                  </div>
                </div>
              </div>

              {/* HUMIDITY */}

              <div className="flex items-center gap-3">
                <Droplets
                  size={24}
                  className="text-blue-100"
                />

                <div>
                  <div className="text-sm text-blue-100">
                    Humidity
                  </div>

                  <div className="font-semibold text-white">
                    {
                      weather.weather
                        .humidity
                    }
                    %
                  </div>
                </div>
              </div>

              {/* WIND */}

              <div className="flex items-center gap-3">
                <Wind
                  size={24}
                  className="text-blue-100"
                />

                <div>
                  <div className="text-sm text-blue-100">
                    Wind
                  </div>

                  <div className="font-semibold text-white">
                    {
                      weather.weather
                        .windSpeed
                    }{" "}
                    km/h
                  </div>
                </div>
              </div>

              {/* LOCATION */}

              <div className="flex items-center gap-3">
                <MapPin
                  size={24}
                  className="text-blue-100"
                />

                <div>
                  <div className="text-sm text-blue-100">
                    Location
                  </div>

                  <div className="font-semibold text-white">
                    {weather.city}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* SCRIPTURE */}

      <div
        className="px-8 py-8"
        style={{
          background:
            "rgba(255,255,255,0.08)",
          backdropFilter: "blur(6px)",
          borderTop:
            "1px solid rgba(255,255,255,.15)",
        }}
      >
        <blockquote className="text-xl italic leading-relaxed text-blue-50">
          "Whatever you are doing, work at it
          whole-souled as for Jehovah and not
          for men."
        </blockquote>

        <p className="mt-4 text-right text-lg font-medium text-blue-100">
          — Colossians 3:23
        </p>
      </div>
    </div>
  );
}