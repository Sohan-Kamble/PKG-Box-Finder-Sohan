interface ContainerResultsProps {
    results: any[];
  }
  
  export default function ContainerResults({ results }: ContainerResultsProps) {
    if (!results.length) return <p>No results to display.</p>;
  
    return (
      <div>
        <h2>Best Containers</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Length</th>
              <th>Width</th>
              <th>Height</th>
              <th>Utilization (%)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((container, index) => (
              <tr key={index}>
                <td>{container.NAME || "N/A"}</td>
                <td>{container.LENGTH}</td>
                <td>{container.WIDTH}</td>
                <td>{container.HEIGHT}</td>
                <td>{container.utilization.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  