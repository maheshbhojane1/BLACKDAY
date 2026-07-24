const DEMANDS = [
  'Resignation of the Union Education Minister, Dharmendra Pradhan, over the NEET-UG paper leak.',
  'A public apology to the students affected by the exam irregularities.',
  'Independent investigation and accountability for the officers who used force on 20 July.',
  'Immediate release and safe treatment of Sonam Wangchuk, who was forcibly hospitalized during his hunger strike.',
  'A genuine overhaul of exam administration — real accountability for paper leaks, not just a resit.',
];

export default function Demands() {
  return (
    <section id="demands">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">The demands</div>
          <h2>What students are asking for</h2>
        </div>
        <ul className="demands">
          {DEMANDS.map((d, i) => (
            <li key={i}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span> {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
