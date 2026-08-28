const COLORS = {
  rosa: { dark: '#9e3657', mid: '#d95772', light: '#f08c91', center: '#f6bd8c' },
  tulipan: { dark: '#a43f55', mid: '#df625f', light: '#f39a75', center: '#f7c27d' },
  girasol: { dark: '#d99722', mid: '#f2bd36', light: '#ffe477', center: '#70452c' }
};

export default function FlowerIllustration({ type = 'rosa' }) {
  const color = COLORS[type] || COLORS.rosa;
  if (type === 'tulipan') return (
    <svg className="flower-svg" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M18 25c4 31 17 47 32 47s28-16 32-47c-10 9-20 7-32-8-12 15-22 17-32 8z" fill={color.mid} stroke={color.dark} strokeWidth="2" strokeLinejoin="round" />
      <path d="M50 20v45M35 31c4 12 10 18 15 20M65 31c-4 12-10 18-15 20" fill="none" stroke={color.light} strokeWidth="3" strokeLinecap="round" opacity=".75" />
      <path d="M50 70c-12 0-20 5-29 14 14 4 24 0 29-7 5 7 15 11 29 7-9-9-17-14-29-14z" fill="#5d8c55" stroke="#416b47" strokeWidth="2" />
    </svg>
  );
  if (type === 'girasol') return (
    <svg className="flower-svg" viewBox="0 0 100 100" aria-hidden="true">
      <g fill={color.mid} stroke={color.dark} strokeWidth="1.5">
        {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="50" cy="22" rx="8" ry="25" transform={`rotate(${i * 30} 50 50)`} />)}
      </g>
      <circle cx="50" cy="50" r="21" fill={color.center} stroke="#56341f" strokeWidth="2" />
      <g fill="#ad7440">{[[43,42],[56,42],[39,53],[51,52],[62,53],[45,63],[57,63]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" />)}</g>
    </svg>
  );
  return (
    <svg className="flower-svg" viewBox="0 0 100 100" aria-hidden="true">
      <g fill={color.dark} stroke={color.dark} strokeWidth="1.5">
        <ellipse cx="50" cy="25" rx="14" ry="28" />
        <ellipse cx="50" cy="75" rx="14" ry="28" />
        <ellipse cx="25" cy="50" rx="28" ry="14" />
        <ellipse cx="75" cy="50" rx="28" ry="14" />
      </g>
      <g fill={color.mid} stroke={color.dark} strokeWidth="1.5">
        <ellipse cx="35" cy="35" rx="19" ry="13" transform="rotate(45 35 35)" />
        <ellipse cx="65" cy="35" rx="19" ry="13" transform="rotate(-45 65 35)" />
        <ellipse cx="35" cy="65" rx="19" ry="13" transform="rotate(-45 35 65)" />
        <ellipse cx="65" cy="65" rx="19" ry="13" transform="rotate(45 65 65)" />
      </g>
      <circle cx="50" cy="50" r="17" fill={color.light} stroke={color.dark} strokeWidth="2" />
      <circle cx="50" cy="50" r="7" fill={color.center} />
    </svg>
  );
}
