export function getColorName(hexColor: string): string {
  // Remove the '#' symbol if present
  hexColor = hexColor.replace('#', '');

  // Convert the hex color to RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate the perceived brightness (Luma)
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;

  // Determine the color name based on the RGB values and Luma
  if (luma > 200) {
    return 'Light';
  } else if (luma < 50) {
    return 'Dark';
  } else if (r > g && r > b) {
    return 'Reddish';
  } else if (g > r && g > b) {
    return 'Greenish';
  } else if (b > r && b > g) {
    return 'Blueish';
  } else {
    return 'Neutral';
  }
}
