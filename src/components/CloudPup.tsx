type CloudPupProps = {
  className?: string;
  compact?: boolean;
};

export function CloudPup({ className = "", compact = false }: CloudPupProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 390"
      role="img"
      aria-label="A cheerful cloud puppy holding pastel balloons"
    >
      <g className="balloon balloon-one">
        <path d="M326 98c-8-34-8-62 3-84" fill="none" stroke="#8ba4c8" strokeWidth="5" />
        <ellipse cx="334" cy="52" rx="31" ry="39" fill="#ffd0e3" stroke="#6d6595" strokeWidth="6" />
        <path d="m329 91 10 1-4 12Z" fill="#ffd0e3" />
      </g>
      <g className="balloon balloon-two">
        <path d="M385 116c13-31 23-56 26-77" fill="none" stroke="#8ba4c8" strokeWidth="5" />
        <ellipse cx="420" cy="50" rx="31" ry="39" fill="#bcecff" stroke="#6d6595" strokeWidth="6" />
        <path d="m412 89 10 3-7 11Z" fill="#bcecff" />
      </g>
      <g className="balloon balloon-three">
        <path d="M276 112c-14-24-25-49-28-69" fill="none" stroke="#8ba4c8" strokeWidth="5" />
        <ellipse cx="242" cy="52" rx="31" ry="39" fill="#fff1a8" stroke="#6d6595" strokeWidth="6" />
        <path d="m237 90 10-1-3 13Z" fill="#fff1a8" />
      </g>
      <path d="M188 174C99 110 29 127 25 184c-4 55 87 91 180 65" fill="#fff" stroke="#307cbd" strokeWidth="10" strokeLinecap="round" />
      <path d="M367 179c76-54 153-63 165-9 12 53-73 100-173 78" fill="#fff" stroke="#307cbd" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="281" cy="213" rx="135" ry="102" fill="#fff" stroke="#307cbd" strokeWidth="10" />
      <path d="M219 286c-15 41-5 82 27 82 18 0 25-17 30-31 10 22 31 37 55 22 27-16 18-55-2-81" fill="#fff" stroke="#307cbd" strokeWidth="10" strokeLinecap="round" />
      <path d="M361 289c54-10 80 49 45 77-22 18-50 5-55-18 27 8 34-20 14-32" fill="#fff" stroke="#307cbd" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="224" cy="237" rx="24" ry="14" fill="#f5b8d6" opacity=".85" />
      <ellipse cx="340" cy="237" rx="24" ry="14" fill="#f5b8d6" opacity=".85" />
      <path d="M235 211q13-15 26 0M303 211q13-15 26 0" fill="none" stroke="#24add3" strokeWidth="8" strokeLinecap="round" />
      <path d="M269 225q13 16 26 0" fill="none" stroke="#6d6595" strokeWidth="6" strokeLinecap="round" />
      {!compact && (
        <g className="pup-star">
          <path d="m458 132 8 18 19 7-19 8-8 18-8-18-19-8 19-7Z" fill="#fff1a8" stroke="#6d6595" strokeWidth="4" />
          <path d="m108 97 5 12 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="#fff" stroke="#6d6595" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}