const embers = [
  [8, 79, 0.9, 9, 0.7], [15, 88, 1.6, 12, 0.5], [24, 72, 4.2, 10, 0.75],
  [31, 91, 2.4, 13, 0.45], [39, 83, 5.1, 9, 0.6], [47, 95, 3.3, 12, 0.85],
  [55, 80, 0.2, 11, 0.55], [63, 90, 4.7, 14, 0.75], [71, 75, 2.9, 10, 0.5],
  [79, 87, 1.1, 13, 0.8], [87, 78, 5.6, 11, 0.55], [94, 92, 3.8, 9, 0.7],
] as const;

export function EmberParticles() {
  return (
    <div className="embers">
      {embers.map(([left, top, delay, duration, opacity], index) => (
        <i
          key={index}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            opacity,
          }}
        />
      ))}
    </div>
  );
}
