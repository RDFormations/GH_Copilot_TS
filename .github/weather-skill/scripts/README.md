# scripts/get_weather.py

Minimal script to fetch current weather for a city using Open-Meteo.

Usage:

```bash
python3 scripts/get_weather.py Paris
```

The script first performs a geocoding request to obtain latitude/longitude, then queries the weather API for temperature and wind.

Notes:

- No external dependencies required (uses the standard `urllib` library).
- The API used is public and does not require an API key.
