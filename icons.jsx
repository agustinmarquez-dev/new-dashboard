/* Tortuguitas — minimal monoline icon set (24x24 viewBox, stroke-based) */
const Icon = ({ d, fill, size = 16, stroke = 1.7, ...rest }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill ? "currentColor" : "none"}
       stroke={fill ? "none" : "currentColor"} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {d}
  </svg>
);

window.Icons = {
  Home: (p) => <Icon {...p} d={<><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></>} />,
  Tools: (p) => <Icon {...p} d={<><path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 0 5.6-5.6l-3 3-2-2 3-3z"/></>} />,
  Chart: (p) => <Icon {...p} d={<><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-3"/></>} />,
  Map: (p) => <Icon {...p} d={<><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></>} />,
  Users: (p) => <Icon {...p} d={<><circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M17 11a3.5 3.5 0 1 0 0-7"/><path d="M16 20a7 7 0 0 1 6-3"/></>} />,
  Check: (p) => <Icon {...p} d={<><path d="M4 12l5 5L20 6"/></>} />,
  Star: (p) => <Icon {...p} d={<><path d="m12 3 2.7 5.7 6.3.9-4.6 4.4 1.2 6.3L12 17l-5.6 3.3 1.2-6.3L3 9.6l6.3-.9z"/></>} />,
  Clock: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>} />,
  Bell: (p) => <Icon {...p} d={<><path d="M6 10a6 6 0 0 1 12 0v4l1.5 3H4.5L6 14z"/><path d="M10 20a2 2 0 0 0 4 0"/></>} />,
  Search: (p) => <Icon {...p} d={<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></>} />,
  Plus: (p) => <Icon {...p} d={<><path d="M12 5v14M5 12h14"/></>} />,
  Flash: (p) => <Icon {...p} d={<><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></>} />,
  Doc: (p) => <Icon {...p} d={<><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h6"/></>} />,
  Cog: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>} />,
  Calendar: (p) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>} />,
  Activity: (p) => <Icon {...p} d={<><path d="M3 12h4l3-7 4 14 3-7h4"/></>} />,
  Reports: (p) => <Icon {...p} d={<><rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M8 16v-4M12 16V8M16 16v-6"/></>} />,
  Settings: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></>} />,
  Chevron: (p) => <Icon {...p} d={<><path d="m6 9 6 6 6-6"/></>} />,
  ChevronR: (p) => <Icon {...p} d={<><path d="m9 6 6 6-6 6"/></>} />,
  ArrowR: (p) => <Icon {...p} d={<><path d="M5 12h14M13 5l7 7-7 7"/></>} />,
  ArrowUp: (p) => <Icon {...p} d={<><path d="M5 19 19 5M8 5h11v11"/></>} />,
  ArrowDown: (p) => <Icon {...p} d={<><path d="M5 5 19 19M19 8v11H8"/></>} />,
  Eye: (p) => <Icon {...p} d={<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>} />,
  Dots: (p) => <Icon {...p} d={<><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></>} />,
  Filter: (p) => <Icon {...p} d={<><path d="M4 5h16l-6 8v6l-4-2v-4z"/></>} />,
  Turtle: (p) => <Icon {...p} d={<><path d="M12 4c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7z" fill="currentColor" stroke="none" opacity=".15"/><path d="M5 14c-1.5 0-2-1-2-2"/><path d="M19 14c1.5 0 2-1 2-2"/><path d="M8 19c-.5 1-1.5 1.5-2 1"/><path d="M16 19c.5 1 1.5 1.5 2 1"/><circle cx="12" cy="11" r="6"/><path d="M9 9h.01M15 9h.01" stroke="white" strokeWidth="2.2"/></>} />,
};
