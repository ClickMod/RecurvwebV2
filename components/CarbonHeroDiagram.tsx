interface Props {
  accent?: string;
}

export function CarbonHeroDiagram({ accent = '#4F33D9' }: Props) {
  const nodes: [number, number, string][] = [
    [280, 120, 'M'],
    [440, 280, 'S'],
    [280, 440, 'C'],
    [120, 280, 'R'],
  ];

  return (
    <svg viewBox="0 0 560 560" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" stroke="rgba(12,11,20,0.06)" strokeWidth="1" fill="none" />
        </pattern>
      </defs>
      <rect width="560" height="560" fill="url(#cgrid)" />
      <circle cx="280" cy="280" r="220" stroke={accent} strokeWidth="1.5" fill="none" strokeDasharray="2 6" />
      <path d="M120 280 A 160 160 0 1 1 440 280 A 160 160 0 1 1 120 280Z" stroke={accent} strokeWidth="2" fill="none" />
      {nodes.map(([x, y, lbl]) => (
        <g key={lbl}>
          <circle cx={x} cy={y} r="22" fill="#fff" stroke={accent} strokeWidth="2" />
          <text x={x} y={y + 5} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fill={accent} fontWeight="600">{lbl}</text>
        </g>
      ))}
      <text x="280" y="80" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">MANDATE</text>
      <text x="486" y="284" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">SCHEDULE</text>
      <text x="280" y="490" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">COLLECT</text>
      <text x="74" y="284" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">RECONCILE</text>
      <circle cx="280" cy="280" r="60" fill={accent} opacity="0.10" />
      <circle cx="280" cy="280" r="40" fill={accent} />
      <text x="280" y="278" textAnchor="middle" fontFamily="Geist, sans-serif" fontSize="14" fill="#fff" fontWeight="600">Recurv</text>
      <text x="280" y="294" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.7)" letterSpacing="1.5">CORE</text>
    </svg>
  );
}
