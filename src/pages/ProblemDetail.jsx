function ProblemDetail() {
  return (
    <div className="problem-page">
      <div className="background-complaints">

<span>missed deadline</span>

<span>too many portals</span>

<span>no response</span>

<span>application rejected</span>

<span>forgot deadline</span>

<span>ghosted by recruiter</span>

<span>no updates</span>

<span>lost track of applications</span>

</div>
      <div className="problem-hero">

        <p className="problem-tag">
          CAREER
        </p>

        <h1>
          Internship Tracking
        </h1>

        <p className="problem-description">
          Students struggle to keep track of
          internship opportunities spread across
          multiple portals, deadlines, and company
          websites.
        </p>
        <section className="featured-complaint">
          <span className="featured-label">
            MOST COMMON FRUSTRATION
          </span>

          <h2>
            "I missed my dream internship because
            I forgot the deadline."
          </h2>

        </section>
      </div>

      <section className="opportunity-section">

        <div className="score-number">
          8.9
        </div>

        <div className="score-content">

          <h3>
            Top Opportunity Signal
          </h3>

          <p>
            Internship tracking has shown
            strong growth in complaints and
            consistent frustration across
            students.
          </p>

        </div>

      </section>

<section className="insights-section">

  <h2>AI Insights</h2>

  <div className="insight-grid">

    <div className="insight-card">
      78% mention deadlines
    </div>

    <div className="insight-card">
      61% mention multiple portals
    </div>

    <div className="insight-card">
      49% mention poor reminders
    </div>

  </div>

</section>
    </div>
  );
}

export default ProblemDetail;