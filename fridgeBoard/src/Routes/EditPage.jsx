// src/pages/EditPost.jsx
import { supabase } from '../client';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({
    name: '',
    color: 'rgba(75, 119, 125, 0.81)',
    ability: '',
    description: '',
  });

  const abilities = ['Eat 10 Cake A Day', 'Power Shot', 'Invisibility', 'Healing'];

  // fetch the pet data
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('CrewMate')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Fetch error:', error);
      } else {
        setPost(data);
      }
    };
    fetchPost();
  }, [id]);

  // update the data
  const updatePost = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from('CrewMate')
      .update({
        name: post.name,
        color: post.color,
        ability: post.ability,
        description: post.description,
      })
      .eq('id', id);
    if (error) {
      console.error('Update error:', error);
    } else {
      navigate('/');
    }
  };
    // delete the data
  const deletePost = async () => {
    const { error } = await supabase
      .from('CrewMate')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Delete error:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <form className='create-post' onSubmit={updatePost}>
      <Link className='back-link' to="/">Back</Link>
      <h2 className="addName">Edit Crewmate</h2>

      <div className="Addinput">
        <label>Name</label>
        <input
          type="text"
          placeholder="Your's Name"
          value={post.name}
          onChange={(e) => setPost({ ...post, name: e.target.value })}
        />
      </div>

      <div className="Addinput">
        <label>Color</label>
        <input
          className='color-input'
          type="color"
          value={post.color}
          onChange={(e) => setPost({ ...post, color: e.target.value })}
        />
      </div>

      <label className='Ability-label'>Chose A Ability:</label>
      <div className="ability-options">
        {abilities.map((ability) => (
          <button
            key={ability}
            type="button"
            className={`ability-button ${post.ability === ability ? 'selected' : ''}`}
            onClick={() => setPost({ ...post, ability })}
          >
            {ability}
          </button>
        ))}
      </div>

      <textarea
        className='description-input'
        placeholder="Some cool description about your cat"
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      />
        <div className='button-group'>
      <button className= 'update-button' type="submit">Update</button>
      <button
        type="button"
        onClick={deletePost}
        style={{ marginLeft: '1rem', backgroundColor: 'crimson', color: 'white' }}
      >
        Delete
      </button>
      </div>
    </form>
  );
};

export default EditPost;
