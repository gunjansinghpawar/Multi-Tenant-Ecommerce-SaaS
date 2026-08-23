export async function getLocationFromIP(ip: string): Promise<{
  country?: string;
  region?: string;
  city?: string;
  lat?: number;
  lon?: number;
}> {
  if (!ip || ip === "Unknown IP" || ip === "127.0.0.1" || ip === "::1" || ip === "localhost") {
    return {};
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const res = await fetch(`http://ip-api.com/json/${ip}`, {
      signal: controller.signal,
      next: { revalidate: 3600 } // Cache identical IP queries for 1 hour to prevent rate limiting
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) return {};
    const data = await res.json();

    if (data.status === "success") {
      return {
        country: data.country,
        region: data.regionName,
        city: data.city,
        lat: data.lat,
        lon: data.lon,
      };
    }
    return {};
  } catch (error) {
    console.error("Geolocation fetch failed:", error);
    return {};
  }
}
