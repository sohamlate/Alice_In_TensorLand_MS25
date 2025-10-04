import { useParams } from "react-router-dom";

const NewsEventDetail = ({ dependencies }) => {
  const { newsId } = useParams();
  console.log("check" , dependencies);
  // Find the event containing this news
  const event = dependencies
    .flatMap(d => d.events)
    .find(e => e.news._id === newsId);

  if (!event) return <p>No event found for this news</p>;

  return (
    <div>
      <h1>{event.news.title}</h1>
      <p><strong>Published:</strong> {new Date(event.news.pubDate).toLocaleString()}</p>
      <p><strong>Link:</strong> <a href={event.news.link} target="_blank">{event.news.link}</a></p>
      <p><strong>Description:</strong> {event.news.description}</p>

      <h2>Event Impact</h2>
      <ul>
        <li>Operational Capability: {event.operationalCapabilityEfficiency.severity}</li>
        <li>Financial Stability: {event.financialStabilityLiquidity.severity}</li>
        <li>Strategic Viability: {event.strategicViabilityLongTermSolvency.severity}</li>
        <li>Supply Chain: {event.supplyChainRobustnessResilience.severity}</li>
        <li>Regulatory: {event.regulatorySocialLicense.severity}</li>
      </ul>

      <p><strong>Justifications:</strong></p>
      <pre>{JSON.stringify(event, null, 2)}</pre>
    </div>
  );
};
