import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); 

  const [crewmates, setCrewmates] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('CrewMate').delete().eq('id', id);
    if (!error) {
      setCrewmates(crewmates.filter((c) => c.id !== id)); // update state
    }
  };


  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('CrewMate')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching crewmates:', error);
      } else {
        setCrewmates(data);
      }
    };

    fetchCrewmates();
  }, []);

  return (
    <div className="home-page">
      <div className="crewmate-flex">
        {crewmates.map((cat) => (
          <div className="crewmate-card" key={cat.id}>
          <div
            className="color-overlay"
            style={{ backgroundColor: cat.color }}
          ></div>
           <div className="crewmate-menu">
      <button
        className="menu-button"
        onClick={() => setOpenMenu(openMenu === cat.id ? null : cat.id)}
      >
        ⋮
      </button>

      {openMenu === cat.id && (
        <div className="menu-dropdown">
          <button onClick={() => navigate(`/edit/${cat.id}`)}>Edit</button>
          <button onClick={() => handleDelete(cat.id)}>Delete</button>
        </div>
      )}
    </div>
            <h3>{cat.name}</h3>
            <p><strong>Ability:</strong> {cat.ability}</p>
            <p>{cat.description}</p>
          <Link className="toView" to={`/detail/${cat.id}`}>
            View Details
          </Link>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Home;
