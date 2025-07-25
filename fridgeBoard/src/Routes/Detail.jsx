// src/pages/DetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';

const DetailPage = () => {
  const { id } = useParams();
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const fetchCat = async () => {
      const { data, error } = await supabase
        .from('CrewMate')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.log(error);
      else setCat(data);
    };
    fetchCat();
  }, [id]);

  if (!cat) return <div>Loading...</div>;

  return (
    <div className="detail-page">
      <Link to="/">← Back</Link>
      <div className="crewmate-card" style={{ backgroundColor: cat.color }}>
        <h2>{cat.name}</h2>
        <p><strong>Ability:</strong> {cat.ability}</p>
        <p>{cat.description}</p>
        <p><small>Created at: {new Date(cat.created_at).toLocaleString()}</small></p>
        <Link to={`/edit/${cat.id}`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;
