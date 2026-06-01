const complaints = [
  {
    text: "Missed another internship deadline 😭",
    top: "20px",
    left: "50px",
  },

  {
    text: "Too many internship portals",
    top: "110px",
    left: "1100px",
  },

  {
    text: "No response after applying",
    top: "150px",
    left: "120px",
  },

  {
    text: "Why do internships require experience?",
    top: "300px",
    left: "750px",
  },

  {
    text: "Freelancers wait forever for payment",
    top: "180px",
    left: "520px",
  },

  {
    text: "Clients disappear after project delivery",
    top: "230px",
    left: "1000px",
  },

  {
    text: "Receipts always get lost",
    top: "280px",
    left: "300px",
  },

  {
    text: "Budgeting feels impossible",
    top: "60px",
    left: "700px",
  },

  {
    text: "Hospitals never sync schedules",
    top: "60px",
    left: "350px",
  },

  {
    text: "Doctor cancelled again",
    top: "320px",
    left: "50px",
  },

  {
    text: "Booking appointments takes forever",
    top: "330px",
    left: "500px",
  },

  {
    text: "No reminders for appointments",
    top: "360px",
    left: "950px",
  },
];

function ProblemAtlas() {
  return (
    <section className="atlas-section">
      <div className="atlas-header">
      <p className="atlas-tag">
        LIVE INTERNET SIGNALS
      </p>

      <h2 className="atlas-title">
        Real Complaints From
        <br />
        Real People
      </h2>

      <p className="atlas-subtitle">
        These are actual frustrations people
        express online every day.
      </p>
    </div>

      <div className="atlas-container">
      
      {complaints.map((node, index) => (
        <div
          key={index}
          className="atlas-node"
          style={{
            top: node.top,
            left: node.left,

            animationDuration:
              `${3 + (index % 3) * 2}s`
          }}
        >
          {node.text}
        </div>
))}
      </div>
    </section>
  );
}

export default ProblemAtlas;