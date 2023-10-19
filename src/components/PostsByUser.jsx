import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SinglePost from './SinglePost';

export default function PostsByUser({ userId }) {
    const [posts, setPosts] = useState([]);

    const getUserPosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/users/${userId}/posts`);
            setPosts(response.data.payload)
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    useEffect(() => {
        getUserPosts()
    }, [userId]);

    console.log(posts);

    return (
        <div>
            <p>Post di: {userId}</p>
            {posts.map((post) => (
                <SinglePost key={post._id} {...post} />
            ))}
        </div>
    );
}
