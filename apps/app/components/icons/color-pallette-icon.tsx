import React from "react";

import type { Props } from "./types";

export const ColorPalletteIcon: React.FC<Props> = ({
  width = "20",
  height = "20",
  className,
  color = "rgb(var(--color-text-200))",
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 16.5C7.975 16.5 7.00625 16.3031 6.09375 15.9094C5.18125 15.5156 4.38437 14.9781 3.70312 14.2969C3.02187 13.6156 2.48437 12.8187 2.09062 11.9062C1.69687 10.9937 1.5 10.025 1.5 9C1.5 7.9375 1.7 6.95 2.1 6.0375C2.5 5.125 3.04687 4.33125 3.74062 3.65625C4.43437 2.98125 5.24687 2.45312 6.17812 2.07187C7.10937 1.69062 8.10625 1.5 9.16875 1.5C10.1562 1.5 11.0937 1.66563 11.9812 1.99687C12.8687 2.32812 13.6469 2.7875 14.3156 3.375C14.9844 3.9625 15.5156 4.65937 15.9094 5.46562C16.3031 6.27187 16.5 7.15625 16.5 8.11875C16.5 9.46875 16.1062 10.5344 15.3187 11.3156C14.5312 12.0969 13.4875 12.4875 12.1875 12.4875H10.7812C10.5562 12.4875 10.3625 12.575 10.2 12.75C10.0375 12.925 9.95625 13.1187 9.95625 13.3312C9.95625 13.6687 10.0469 13.9562 10.2281 14.1937C10.4094 14.4312 10.5 14.7062 10.5 15.0187C10.5 15.4937 10.3687 15.8594 10.1062 16.1156C9.84375 16.3719 9.475 16.5 9 16.5ZM4.63125 9.4875C4.88125 9.4875 5.1 9.39375 5.2875 9.20625C5.475 9.01875 5.56875 8.8 5.56875 8.55C5.56875 8.3 5.475 8.08125 5.2875 7.89375C5.1 7.70625 4.88125 7.6125 4.63125 7.6125C4.38125 7.6125 4.1625 7.70625 3.975 7.89375C3.7875 8.08125 3.69375 8.3 3.69375 8.55C3.69375 8.8 3.7875 9.01875 3.975 9.20625C4.1625 9.39375 4.38125 9.4875 4.63125 9.4875ZM6.99375 6.3C7.24375 6.3 7.4625 6.20625 7.65 6.01875C7.8375 5.83125 7.93125 5.6125 7.93125 5.3625C7.93125 5.1125 7.8375 4.89375 7.65 4.70625C7.4625 4.51875 7.24375 4.425 6.99375 4.425C6.74375 4.425 6.525 4.51875 6.3375 4.70625C6.15 4.89375 6.05625 5.1125 6.05625 5.3625C6.05625 5.6125 6.15 5.83125 6.3375 6.01875C6.525 6.20625 6.74375 6.3 6.99375 6.3ZM11.0062 6.3C11.2562 6.3 11.475 6.20625 11.6625 6.01875C11.85 5.83125 11.9437 5.6125 11.9437 5.3625C11.9437 5.1125 11.85 4.89375 11.6625 4.70625C11.475 4.51875 11.2562 4.425 11.0062 4.425C10.7562 4.425 10.5375 4.51875 10.35 4.70625C10.1625 4.89375 10.0687 5.1125 10.0687 5.3625C10.0687 5.6125 10.1625 5.83125 10.35 6.01875C10.5375 6.20625 10.7562 6.3 11.0062 6.3ZM13.4625 9.4875C13.7125 9.4875 13.9312 9.39375 14.1187 9.20625C14.3062 9.01875 14.4 8.8 14.4 8.55C14.4 8.3 14.3062 8.08125 14.1187 7.89375C13.9312 7.70625 13.7125 7.6125 13.4625 7.6125C13.2125 7.6125 12.9937 7.70625 12.8062 7.89375C12.6187 8.08125 12.525 8.3 12.525 8.55C12.525 8.8 12.6187 9.01875 12.8062 9.20625C12.9937 9.39375 13.2125 9.4875 13.4625 9.4875ZM9 15.375C9.1375 15.375 9.23437 15.3469 9.29062 15.2906C9.34687 15.2344 9.375 15.1437 9.375 15.0187C9.375 14.8437 9.28437 14.6812 9.10312 14.5312C8.92187 14.3812 8.83125 14.05 8.83125 13.5375C8.83125 12.9625 9.01875 12.4562 9.39375 12.0187C9.76875 11.5812 10.2437 11.3625 10.8187 11.3625H12.1875C13.1375 11.3625 13.9062 11.0844 14.4937 10.5281C15.0812 9.97187 15.375 9.16875 15.375 8.11875C15.375 6.46875 14.75 5.14062 13.5 4.13437C12.25 3.12812 10.8062 2.625 9.16875 2.625C7.34375 2.625 5.79687 3.24062 4.52812 4.47187C3.25937 5.70312 2.625 7.2125 2.625 9C2.625 10.7625 3.24687 12.2656 4.49062 13.5094C5.73438 14.7531 7.2375 15.375 9 15.375Z"
      fill={color}
    />
  </svg>
);