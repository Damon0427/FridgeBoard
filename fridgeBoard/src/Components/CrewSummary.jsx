// Components/CrewSummary.jsx
import { useEffect, useState } from "react";
import { supabase } from "../client";

const CrewSummary = () => {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("CrewMate")
        .select("*");

      if (!error) {
        setCrewmates(data);
      }
    };

    fetchData();
  }, []);

  const getAbilityStats = () => {
    const total = crewmates.length;
    const counts = {};

    crewmates.forEach((mate) => {
      counts[mate.ability] = (counts[mate.ability] || 0) + 1;
    });

    const percentages = {};
    for (let ability in counts) {
      percentages[ability] = ((counts[ability] / total) * 100).toFixed(1);
    }

    return percentages;
  };

  const abilityStats = getAbilityStats();

  return (
    <div className="summary">
      <h3>Crew Summary</h3>
      {Object.entries(abilityStats).map(([ability, percent]) => (
        <p key={ability}>
          {percent}% of crewmates have ability: <strong>{ability}</strong>
        </p>
      ))}
    </div>
  );
};

export default CrewSummary;
