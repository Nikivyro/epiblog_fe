import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import SinglePost from '../components/Posts/SinglePost';
import { useDispatch, useSelector } from 'react-redux';

export default function PostDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.user.id);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/posts/${postId}`);
            if (response.status === 200) {
                setPost(response.data.posts);
            }
        } catch (err) {
            console.error('Errore nella richiesta API:', err);
            setError(err.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, [postId]);


    const refreshPosts = () => {
        fetchData();
      };

    return (
        <MainLayout>
            <Container>
                <Row>
                    <Col xs={12} className='py-3 text-start'>
                        <Link to="/"><Button variant="primary"><i className="bi bi-house me-1"></i>Torna alla Home</Button></Link>
                    </Col>
                    <Col xs={12}>
                        {error ? (
                            <p>Si è verificato un errore: {error}</p>
                        ) : post ? (
                        <SinglePost key={post._id} author={post.author} currentUser={currentUserId} refreshPosts={refreshPosts} {...post} />
                        ) : (
                            <>
                                <Spinner animation="grow" />
                                <p>Caricamento in corso...</p>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
}
