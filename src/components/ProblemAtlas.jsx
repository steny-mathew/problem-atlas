const isMobile = window.innerWidth <= 768;
const complaints = isMobile
  ? [
      {
        text: "Missed another internship deadline 😭",
        top: "5%",
        left: "5%",
      },

      {
        text: "No response after applying",
        top: "20%",
        left: "45%",
      },

      {
        text: "Doctor cancelled again",
        top: "40%",
        left: "10%",
      },

      {
        text: "Budgeting feels impossible",
        top: "55%",
        left: "50%",
      },

      {
        text: "Freelancers wait forever for payment",
        top: "75%",
        left: "15%",
      },
    ]
  : [
    {
      text: "Missed another internship deadline 😭",
      top: "5%",
      left: "0%",
    },
  
    {
      text: "No response after applying",
      top: "40%",
      left: "0%",
    },
  
    {
      text: "Why do internships require experience?",
      top: "60%",
      left: "20%",
    },
  
    {
      text: "Freelancers wait forever for payment",
      top: "180px",
      left: "40%",
    },
  
    {
      text: "Receipts always get lost",
      top: "55%",
      left: "70%",
    },
  
    {
      text: "Budgeting feels impossible",
      top: "60px",
      left: "700px",
    },
  
    {
      text: "Hospitals never sync schedules",
      top: "10%",
      left: "45%",
    },
  
    {
      text: "Doctor cancelled again",
      top: "320px",
      left: "0%",
    },
  
    {
      text: "Booking appointments takes forever",
      top: "330px",
      left: "500px",
    },
    ];


function ProblemAtlas() {
  return (
    <section id="atlas" className="atlas-section">
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