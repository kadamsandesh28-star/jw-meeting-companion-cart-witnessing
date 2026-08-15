import {
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Box,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState } from "react";

import SearchDialog from "./search/SearchDialog";

import {
  loadCongregationProfile,
} from "../features/settings/storage/congregationProfileStorage";

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

function getWeatherDescription(code: number) {
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

  return "Current weather";
}

function getWeatherIcon(code: number) {
  if (code === 0) {
    return "☀️";
  }

  if (code === 1 || code === 2) {
    return "🌤️";
  }

  if (code === 3) {
    return "☁️";
  }

  if (code === 45 || code === 48) {
    return "🌫️";
  }

  if (code >= 51 && code <= 67) {
    return "🌧️";
  }

  if (code >= 71 && code <= 77) {
    return "❄️";
  }

  if (code >= 80 && code <= 82) {
    return "🌦️";
  }

  if (code >= 95 && code <= 99) {
    return "⛈️";
  }

  return "🌤️";
}

export default function HeroCard() {
  const [time, setTime] = useState(new Date());

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [location, setLocation] =
    useState<LocationData | null>(null);

  const [weatherLoading, setWeatherLoading] =
    useState(false);

  /*
   * Live clock
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /*
   * Load current weather.
   *
   * The city comes from the actual
   * Congregation Settings page.
   */
  useEffect(() => {
    async function loadWeather() {
      const profile =
        loadCongregationProfile();

      const city =
        profile.city?.trim() || "";

      if (!city) {
        setWeather(null);
        setLocation(null);
        return;
      }

      try {
        setWeatherLoading(true);

        /*
         * First convert the city name
         * into latitude/longitude.
         */
        const geocodeResponse =
          await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
              city
            )}&count=1&language=en&format=json`
          );

        if (!geocodeResponse.ok) {
          throw new Error(
            "Unable to find location."
          );
        }

        const geocodeData =
          await geocodeResponse.json();

        const result =
          geocodeData.results?.[0];

        if (!result) {
          throw new Error(
            "Location not found."
          );
        }

        setLocation({
          latitude: result.latitude,
          longitude: result.longitude,
          name: result.name,
          country: result.country,
        });

        /*
         * Now get current weather
         * for those coordinates.
         */
        const weatherResponse =
          await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh`
          );

        if (!weatherResponse.ok) {
          throw new Error(
            "Unable to load weather."
          );
        }

        const weatherData =
          await weatherResponse.json();

        setWeather({
          temperature:
            weatherData.current
              .temperature_2m,

          apparentTemperature:
            weatherData.current
              .apparent_temperature,

          humidity:
            weatherData.current
              .relative_humidity_2m,

          windSpeed:
            weatherData.current
              .wind_speed_10m,

          weatherCode:
            weatherData.current
              .weather_code,
        });
      } catch (error) {
        console.error(
          "Weather loading failed:",
          error
        );

        setWeather(null);
        setLocation(null);
      } finally {
        setWeatherLoading(false);
      }
    }

    loadWeather();

    /*
     * Refresh weather every 15 minutes.
     */
    const refresh = setInterval(
      loadWeather,
      15 * 60 * 1000
    );

    return () => clearInterval(refresh);
  }, []);

  const hour = time.getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const date =
    time.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const clock =
    time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <>
      <Card
        sx={{
          mb: 4,
          borderRadius: 5,
          color: "white",
          background:
            "linear-gradient(135deg,#0D47A1,#1976D2,#42A5F5)",
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={4}
            justifyContent="space-between"
          >
            {/* LEFT SIDE */}
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                📖 My JW Companion
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mt: 3,
                }}
              >
                {greeting}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                }}
              >
                Continue your spiritual routine.
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={3}
                sx={{
                  mt: 4,
                }}
              >
                <Typography>
                  📅 {date}
                </Typography>

                <Typography>
                  🕒 {clock}
                </Typography>
              </Stack>

              <Button
                variant="contained"
                color="secondary"
                startIcon={
                  <SearchIcon />
                }
                sx={{
                  mt: 4,
                  borderRadius: 3,
                }}
                onClick={() =>
                  setSearchOpen(true)
                }
              >
                Global Search
              </Button>
            </Box>

            {/* WEATHER */}
            <Box
              sx={{
                minWidth: {
                  xs: "100%",
                  md: 300,
                },
                maxWidth: {
                  xs: "100%",
                  md: 340,
                },
                alignSelf: {
                  xs: "stretch",
                  md: "center",
                },
                p: 2.5,
                borderRadius: 4,
                backgroundColor:
                  "rgba(255,255,255,0.14)",
                backdropFilter:
                  "blur(8px)",
              }}
            >
              {weatherLoading ? (
                <Typography>
                  🌤️ Loading weather...
                </Typography>
              ) : weather &&
                location ? (
                <Stack spacing={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.85,
                    }}
                  >
                    📍 {location.name}
                    {location.country
                      ? `, ${location.country}`
                      : ""}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: 44,
                        lineHeight: 1,
                      }}
                    >
                      {getWeatherIcon(
                        weather.weatherCode
                      )}
                    </Typography>

                    <Box>
                      <Typography
                        variant="h3"
                        fontWeight={800}
                      >
                        {Math.round(
                          weather.temperature
                        )}
                        °C
                      </Typography>

                      <Typography>
                        {getWeatherDescription(
                          weather.weatherCode
                        )}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      mt: 1,
                    }}
                  >
                    Feels like{" "}
                    {Math.round(
                      weather.apparentTemperature
                    )}
                    °C
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                    >
                      💧 {weather.humidity}%
                    </Typography>

                    <Typography
                      variant="body2"
                    >
                      💨{" "}
                      {Math.round(
                        weather.windSpeed
                      )}{" "}
                      km/h
                    </Typography>
                  </Stack>

                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      mt: 1,
                    }}
                  >
                    Weather by Open-Meteo
                  </Typography>
                </Stack>
              ) : (
                <Stack spacing={1}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    🌤️ Local Weather
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.85,
                    }}
                  >
                    Add your city in
                    Congregation Settings
                    to see current weather.
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <SearchDialog
        open={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />
    </>
  );
}