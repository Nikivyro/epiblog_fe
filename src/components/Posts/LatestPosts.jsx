import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import SinglePost from './SinglePost';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Spinner, Modal } from 'react-bootstrap';
import AddPostModal from './AddPostModal';

export default function LatestPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [posts, setPosts] = useState({ data: [], totalPages: 0 }); // Modificato per includere totalPages
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.id);
  const inputValue = useSelector((state) => state.search.inputValue);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_URL_ENDPOINT}/posts?page=${currentPage}&pageSize=${pageSize}`
      );
      setPosts({
        data: response.data.posts,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  const onChangePageSize = (e) => {
    const pageChangedSize = parseInt(e.target.value);
    setPageSize(pageChangedSize);
    setCurrentPage(1);
  };

  useEffect(() => {
    getPosts();
  }, [currentPage, pageSize]);

  const refreshPosts = () => {
    getPosts();
  };
  
  return (
    <div className="container mx-auto my-3">
      <div className="row my-3">
        <div className="col text-start">
          <Button className="" variant="primary" onClick={toggleModal}>
            <i className="bi bi-plus me-1"></i>Crea un post
          </Button>
        </div>
        <div className="col text-end">
          <label htmlFor="pageItems">Mostra per pagina</label>
          <select name="pageItems" className="p-1 rounded ms-1" id="pageItems" onChange={onChangePageSize} value={pageSize}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Row className="py-5">
          <Col>
            <Spinner animation="grow" />
          </Col>
        </Row>
      ) : posts.data.length === 0 ? (
        <Row>
          <Col>
            <p>Oops! Nessun risultato trovato. Riprova la ricerca</p>
          </Col>
        </Row>
      ) : (
        <div className="row">
          {posts.data
            .filter((post) => inputValue === '' || post.title.toLowerCase().includes(inputValue.toLowerCase()))
            .map((post) => (
              <SinglePost key={post._id} currentUser={currentUserId} refreshPosts={refreshPosts} {...post} />
            ))}
        </div>
      )}

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crea un post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPostModal closeModal={toggleModal} refreshPosts={refreshPosts}/>
        </Modal.Body>
      </Modal>

      <ResponsivePagination
        current={currentPage}
        total={posts.totalPages}
        onPageChange={handlePagination}
      />
    </div>
  );
}
