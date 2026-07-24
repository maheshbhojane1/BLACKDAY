export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h4>A note on numbers</h4>
            <p>
              The "200+" figure reflects what student organizers have reported; independent press
              coverage has confirmed 100+ injuries so far and reporting is ongoing. We'll update
              this as verified submissions and official tallies come in — this archive aims to be
              accurate, not just loud.
            </p>
          </div>
          <div>
            <h4>Stay safe</h4>
            <ul>
              <li>Blur bystanders' faces if unsure they'd want to be shown</li>
              <li>Avoid sharing others' personal details</li>
              <li>If you're in danger, seek medical or legal help first</li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="#account">What happened</a></li>
              <li><a href="#demands">Demands</a></li>
              <li><a href="#wall">Evidence wall</a></li>
            </ul>
          </div>
        </div>
        <div className="fine">
          Independent student-run archive. Not affiliated with any political party. Content is
          user-submitted and reviewed for authenticity before publishing.
        </div>
      </div>
    </footer>
  );
}
