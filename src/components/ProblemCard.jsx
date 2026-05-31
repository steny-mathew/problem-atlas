function ProblemCard({ problem }) {
  return (
    <div className="card">
      <h2>{problem.title}</h2>

      <p>
        <strong>Mentions:</strong>{" "}
        {problem.mentions}
      </p>

      <p>
        <strong>Growth:</strong>{" "}
        +{problem.growth}%
      </p>

      <p>
        <strong>Opportunity Score:</strong>{" "}
        {problem.score}
      </p>

      <h4>Sample Complaints</h4>

      <ul>
        {problem.complaints.map(
          (complaint, index) => (
            <li key={index}>
              {complaint}
            </li>
          )
        )}
      </ul>

      <div className="buttons">
        <button>View Details</button>
        <button>I'm Building This</button>
      </div>
    </div>
  );
}

export default ProblemCard;