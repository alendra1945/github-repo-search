import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const calculateFontSize = (
  width: number,
  height: number,
  maxFontSize = 100,
  scaleFactor = 0.5
) => {
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};
export const getAverageRgb = (imgUrl: string) => {
  try {
    const context = document.createElement("canvas").getContext("2d");
    const src = imgUrl;
    const img = new Image();
    img.setAttribute("crossOrigin", "");
    img.src = src;
    if (context) {
      context.imageSmoothingEnabled = true;
      context.drawImage(img, 0, 0, 1, 1);
      return `rgb(${context.getImageData(0, 0, 1, 1).data.slice(0, 3).join(",")})`;
    }
  } catch {
    console.log("image notfound");
  }

  return "#167364";
};
const COLORS: string[] = [
  "#F1416C",
  "#A838FF",
  "#FFC700",
  "#F9666E",
  "#d946ef",
  "#FFBB2C",
  "#35D29A",
  "#3699FF",
  "#7239EA",
  "#14b8a6",
  "#1d4ed8",
  "#be123c",
];

export function getRandomColorById(id: number): string {
  return COLORS[id % COLORS.length];
}
