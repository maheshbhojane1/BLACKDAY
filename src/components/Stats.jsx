const STATS = [
  { num: '200+', label: 'Injured, per student organizers' },
  { num: '100+', label: 'Injuries confirmed by press' },
  { num: '3+', label: 'Cities affected' },
  { num: '20+', label: "Days of Sonam Wangchuk's hunger strike" },
  { num: '0', label: 'Officers held accountable so far' },
];

export default function Stats() {
  return (
    <>
      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="num">{s.num}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="stats-note">
        Figures are being verified as submissions come in — see "A note on numbers" in the footer.
      </div>
    </>
  );
}
