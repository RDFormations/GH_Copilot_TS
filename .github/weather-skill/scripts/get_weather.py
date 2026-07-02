#!/usr/bin/env python3
"""Fetch current weather for a city via Open-Meteo.

Usage:
  python3 scripts/get_weather.py Paris

This version uses only the standard library (urllib).
"""
import sys
import urllib.parse
import urllib.request
import json


def geocode(city: str):
    q = urllib.parse.quote(city)
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={q}&count=1"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            data = json.load(r)
    except Exception as e:
        raise RuntimeError(f"Geocoding request failed: {e}")
    results = data.get("results")
    if not results:
        return None
    return results[0]


def get_current_weather(lat, lon, timezone="UTC"):
    tz = urllib.parse.quote(str(timezone))
    url = (
        f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}"
        f"&current_weather=true&timezone={tz}"
    )
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            data = json.load(r)
    except Exception as e:
        raise RuntimeError(f"Weather request failed: {e}")
    return data.get("current_weather")


def format_weather(location: dict, weather: dict) -> str:
    name = location.get("name")
    country = location.get("country")
    temp = weather.get("temperature")
    windspeed = weather.get("windspeed")
    winddir = weather.get("winddirection")
    time = weather.get("time")
    lines = [f"Weather for {name}, {country} — {time}"]
    lines.append(f"Temperature: {temp} °C")
    lines.append(f"Wind: {windspeed} m/s, direction {winddir}°")
    return "\n".join(lines)


def get_weather_for_city(city: str) -> str:
    """Return formatted weather (string) for `city`. Raises if not found."""
    if not city:
        raise ValueError("No city name provided.")
    loc = geocode(city)
    if not loc:
        raise ValueError(f"No location found for '{city}'.")
    lat = loc.get("latitude")
    lon = loc.get("longitude")
    tz = loc.get("timezone", "UTC")
    if lat is None or lon is None:
        raise RuntimeError("Missing coordinates for the matched location.")
    weather = get_current_weather(lat, lon, tz)
    if not weather:
        raise RuntimeError(
            "Unable to fetch current weather for this location.")
    return format_weather(loc, weather)


def main():
    if len(sys.argv) >= 2:
        city = " ".join(sys.argv[1:])
    else:
        city = input("City: ").strip()
    try:
        output = get_weather_for_city(city)
    except Exception as e:
        print(str(e))
        sys.exit(2)
    print(output)


if __name__ == "__main__":
    main()
