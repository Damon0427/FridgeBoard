import { supabase } from '../client'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState({
        name: '',
        color: 'rgba(75, 119, 125, 0.81)',
        ability: '',
        description: '',
    });
    const abilities = ['Eat 10 Cake A Day', 'Power Shot', 'Invisibility', 'Healing'];

    const createPost = async (event) => { 

        event.preventDefault();
        console.log('Creating post:', post);
            const { error } = await supabase
      .from('CrewMate')
      .insert({
        name: post.name,
        description: post.description,
        color: post.color,
        ability: post.ability
      })
      .select();

    if (error) {
      console.error('Insert error:', error);
    } else {
      navigate('/');  // 用导航跳转，避免刷新断开连接
    }
  };

    return (

        <form className='create-post' onSubmit={createPost}>
            <Link className='back-link' to = "/">Back</Link>
            <h2 className="addName">Create a New Post</h2>
            <div className="Addinput">
            <label>Name</label>
            <input type="text" placeholder="Your's Name" value={post.name}   onChange={(e) => setPost({ ...post, name: e.target.value })} />
            </div>

            <div className="Addinput">
            <label>Color</label>
            <input className='color-input' type="color" value= {post.color} onChange={(e) => setPost({ ...post, color: e.target.value })} />
            </div>
            <label className='Ability-label'> Chose A Ability:</label>
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
            <button type="submit" >Create Post</button>
        </form>
    )
};

export default CreatePost;