interface Props {
  accent?: string;
}

const CX = 280;
const CY = 280;

export function CarbonHeroDiagram({ accent = '#6841F0' }: Props) {
  const nodes: [number, number, string][] = [
    [280, 120, 'M'],
    [440, 280, 'S'],
    [280, 440, 'C'],
    [120, 280, 'R'],
  ];

  return (
    <svg viewBox="0 0 560 560" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <pattern id="chd-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" stroke="rgba(12,11,20,0.06)" strokeWidth="1" fill="none" />
        </pattern>
        <radialGradient id="chd-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Layer 1 — grid */}
      <rect width="560" height="560" fill="url(#chd-grid)" />

      {/* Layer 2 — outer dashed ring, clockwise 80s */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${CX} ${CY}`}
          to={`360 ${CX} ${CY}`}
          dur="80s"
          repeatCount="indefinite"
        />
        <circle
          cx={CX} cy={CY} r="220"
          stroke={accent} strokeWidth="1.5" fill="none"
          strokeDasharray="2 6" opacity="0.7"
        />
      </g>

      {/* Layer 3 — inner dashed ring, counter-clockwise 55s */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`360 ${CX} ${CY}`}
          to={`0 ${CX} ${CY}`}
          dur="55s"
          repeatCount="indefinite"
        />
        <circle
          cx={CX} cy={CY} r="112"
          stroke={accent} strokeWidth="1" fill="none"
          strokeDasharray="1 9" opacity="0.55"
        />
      </g>

      {/* Layer 4 — main loop: solid base + marching-ants overlay */}
      <circle cx={CX} cy={CY} r="160" stroke={accent} strokeWidth="2" fill="none" />
      <circle
        cx={CX} cy={CY} r="160"
        stroke={accent} strokeWidth="2.5" fill="none"
        strokeDasharray="3 15" strokeLinecap="round" opacity="0.65"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0" to="-18"
          dur="6s" repeatCount="indefinite"
        />
      </circle>

      {/* Layer 5 — orbiting payment token, clockwise 9s */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${CX} ${CY}`}
          to={`360 ${CX} ${CY}`}
          dur="9s"
          repeatCount="indefinite"
        />
        <circle cx={CX} cy={120} r="26" fill="url(#chd-glow)" />
        <circle cx={CX} cy={120} r="7" fill={accent} />
        <circle cx={CX} cy={120} r="7" fill="none" stroke="#fff" strokeWidth="2" />
      </g>

      {/* Layer 6 — four stage nodes */}
      {nodes.map(([x, y, lbl]) => (
        <g key={lbl}>
          <circle cx={x} cy={y} r="22" fill="#fff" stroke={accent} strokeWidth="2" />
          <text
            x={x} y={y + 5}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="13"
            fill={accent}
            fontWeight="600"
          >
            {lbl}
          </text>
        </g>
      ))}

      {/* Layer 7 — corner labels */}
      <text x="280" y="80" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">MANDATE</text>
      <text x="470" y="284" textAnchor="start"  fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">SCHEDULE</text>
      <text x="280" y="490" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">COLLECT</text>
      <text x="90"  y="284" textAnchor="end"    fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">RECONCILE</text>

      {/* Layer 8 — pulsing core */}
      {/* Heartbeat expanding ring */}
      <circle cx={CX} cy={CY} r="40" fill="none" stroke={accent} strokeWidth="1.5">
        <animate attributeName="r"       from="40"   to="74" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.35" to="0"  dur="3.2s" repeatCount="indefinite" />
      </circle>
      {/* Translucent backdrop disc */}
      <circle cx={CX} cy={CY} r="60" fill={accent} opacity="0.12" />
      {/* Solid core disc */}
      <circle cx={CX} cy={CY} r="40" fill={accent} />
      {/* Core labels */}
      <text x={CX} y={CY - 3} textAnchor="middle" fontFamily="Geist, sans-serif" fontSize="14" fill="#fff" fontWeight="600">Recurv</text>
      <text x={CX} y={CY + 13} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.7)" letterSpacing="1.5">CORE</text>
    </svg>
  );
}
