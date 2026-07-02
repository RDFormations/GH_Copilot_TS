---
name: weather-skill
description: Provides current weather for a given city by querying the Open-Meteo API. The skill is workspace-scoped and relies on a small Python script in `scripts/get_weather.py`.
user-invocable: false
---

# Skill: City weather

## Objective

Provide current weather for a given city by querying a public API (Open-Meteo). The skill is workspace-scoped and relies on a small Python script in `scripts/get_weather.py`.

## Triggers

- Natural prompt: "Give me the weather in Paris" or "weather <city>".
- Programmatic use: call `scripts/get_weather.py` with the city name.

## Expected inputs

- `city` (string): city or town name to look up.

## APIs used

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1`
- Weather: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&timezone={tz}`

These APIs are public and do not require an API key.

## Step-by-step process

1. Receive the city name.
2. Call the geocoding API to obtain latitude, longitude, and timezone.
3. If no city is found → return a clear error and suggest refining the query.
4. Call the weather API to fetch `current_weather`.
5. Format the response in English (temperature, wind, direction, local time) and return it.

## Decision points / branches

- If the search returns multiple results: pick the first result or ask for clarification (current implementation: first result).
- If the geocoding or weather API is unavailable: return an error message and suggestions (retry later).

## Quality criteria / validations

- Latitude/longitude must be present and numeric.
- `current_weather` must contain `temperature` and `windspeed`.
- Error messages must be readable in English.

## Usage example (prompt)

- "Give me the weather in Lyon"
- "weather Marseille"

## Code location

- Python script: `scripts/get_weather.py Paris`
- Execution readme: `scripts/README.md`

## Limitations and possible improvements

- Support quotes and country aliases (e.g. "Springfield, US") via a `country` parameter.
- Add local caching to limit API calls.
- Support hourly/daily forecasts.

## Open questions

- Should the skill ask for clarification when multiple cities are found?
- Do you prefer a specific API (e.g. national weather service) requiring authentication?

---

Auto-generated: provides the implementation script in `scripts/`.
