/**
 * Tawk.to embed URL. Override with NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID.
 */
const DEFAULT_PROPERTY_ID = "69d6a90eb927021c2d6b69e5";
const DEFAULT_WIDGET_ID = "1jln88ono";

export function getTawkEmbedSrc(): string {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID?.trim() || DEFAULT_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID?.trim() || DEFAULT_WIDGET_ID;
  return `https://embed.tawk.to/${propertyId}/${widgetId}`;
}
