export function StageLogo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Stage Motors"
    >
      <text
        x="0"
        y="38"
        fill="white"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="48"
        fontWeight="400"
        letterSpacing="4"
      >
        STAGE
      </text>
      <text
        x="60"
        y="56"
        fill="white"
        fontFamily="'Source Sans 3', sans-serif"
        fontSize="14"
        fontWeight="300"
        letterSpacing="6"
      >
        MOTORS
      </text>
    </svg>
  );
}
