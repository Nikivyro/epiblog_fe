import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import SinglePost from './SinglePost';
import AddPostModal from './AddPostModal';

export default function LatestPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [posts, setPosts] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const getPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/posts?page=${currentPage}&pageSize=${pageSize}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  const handlePagination = (value) => {
    setCurrentPage(value)
  }

  const onChangePageSize = (e) => {
    const pageChangedSize = parseInt(e.target.value);
    setPageSize(pageChangedSize);
  }

  useEffect(() => {
    getPosts()
  }, [currentPage, pageSize])

  return (
    <div className="container mx-auto my-3">
      <div className='row'>
        <div className='col'>
          <button 
            className='p-4 bg-orange-500 rounded-lg'
            onClick={toggleModal}
          >
            Crea un post
          </button>
        </div>
        <div>
          <label htmlFor="pageItems">Mostra per pagina</label>
          <select name="pageItems" id="pageItems" onChange={onChangePageSize} value={pageSize}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <div className="row">
        {posts && posts.posts?.map((post) => (
          <SinglePost
            key={post._id}
            {...post}
          />
          ))}
      </div>
      {isModalOpen && (
        <AddPostModal closeModal={setIsModalOpen} />
      )}
      <ResponsivePagination
        current={currentPage}
        total={posts && posts.totalPages}
        onPageChange={handlePagination}
      />
    </div>
  )
}
