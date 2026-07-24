const EVENTS = [
  {
    date: 'MAY 3, 2026',
    title: 'NEET-UG exam held, then cancelled',
    body: "Nearly 2.28 million candidates sit the exam. Days later it's cancelled after allegations the questions were leaked — later confirmed by a government inquiry. Students resit under tight security weeks after.",
  },
  {
    date: 'JUNE 28, 2026',
    title: 'Sonam Wangchuk begins his hunger strike',
    body: 'The 59-year-old engineer and education activist starts fasting at Jantar Mantar in support of the students\' movement.',
  },
  {
    date: 'JULY 9, 2026',
    title: 'CJP announces the march',
    body: "The Cockroach Janta Party calls for a march to Parliament on 20 July, demanding Education Minister Dharmendra Pradhan's resignation.",
  },
  {
    date: 'JULY 19, 2026',
    title: 'Wangchuk forcibly hospitalized',
    body: 'After three weeks of fasting, authorities remove Wangchuk from the protest site and take him to hospital. He continues his fast from his hospital bed.',
  },
  {
    date: 'JULY 20, 2026',
    title: 'March on Parliament, crackdown at Jantar Mantar',
    body: 'Tens of thousands march toward Parliament during the Monsoon Session. Police deploy tear gas and baton charges to disperse the crowd. More than 100 injuries are confirmed by press on the day; students say the real number is higher.',
  },
  {
    date: 'JULY 21–23, 2026',
    title: 'Movement spreads, tensions continue',
    body: "Protests turn violent in Patna. Congress MPs, including Rahul Gandhi, are briefly detained protesting outside the PM's residence. Mobile internet is suspended around Jantar Mantar.",
  },
  {
    date: 'ONGOING',
    title: "We're still here",
    body: 'Organizers say 20 July was only "the first call to march" and warn of a larger mobilization if the government does not act.',
  },
];

export default function Timeline() {
  return (
    <section id="timeline">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Timeline</div>
          <h2>How we got here</h2>
        </div>
        <div className="timeline">
          {EVENTS.map((e) => (
            <div className="tl-item" key={e.date + e.title}>
              <div className="date">{e.date}</div>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
