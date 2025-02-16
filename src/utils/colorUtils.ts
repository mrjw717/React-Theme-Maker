export function adjustColor(color: string, factor: number): string {
  if (!color) return color;

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const rgb = hexToRgb(color);
  if (!rgb) return color;

  let r = Math.max(0, Math.min(255, rgb.r + (factor / 100) * 255));
  let g = Math.max(0, Math.min(255, rgb.g + (factor / 100) * 255));
  let b = Math.max(0, Math.min(255, rgb.b + (factor / 100) * 255));

  return rgbToHex(Math.round(r), Math.round(g), Math.round(b));
}
