import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';

export default function EditPostModal({ _id, initialData, closeModalEdit }) {
  const [formData, setFormData] = useState(initialData);
  const [coverFile, setCoverFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, field] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [field]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCoverChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formDataForCloudinary = new FormData();
      if (coverFile) {
        formDataForCloudinary.append('cover', coverFile);
      }

      if (coverFile) {
        const cloudinaryResponse = await fetch(
          `${process.env.REACT_APP_URL_ENDPOINT}/posts/${_id}/uploadCover`,
          {
            method: 'POST',
            body: formDataForCloudinary,
          }
        );

        if (cloudinaryResponse.status === 200) {
          const cloudinaryData = await cloudinaryResponse.json();
          formData.cover = cloudinaryData.cover;
        } else {
          setErrorMessage("Errore nell'upload della copertina su Cloudinary");
          return;
        }
      }
      
      setIsEditing(true);

      const response = await fetch(
        `${process.env.REACT_APP_URL_ENDPOINT}/posts/update/${_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 200) {
        closeModalEdit()
      } else {
        setErrorMessage("Errore nell'aggiornamento del post");
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento del post", error);
      setErrorMessage('Errore interno del server');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="edit-post-form">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold mb-3'>Titolo</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold mb-3'>Categoria</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-bold mb-3'>Copertina</Form.Label>
          <Form.Control
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleCoverChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fw-bold mb-3'>Contenuto</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold mb-3'>Tempo di lettura (valore)</Form.Label>
              <Form.Control
                type="number"
                name="readTime.value"
                value={formData.readTime.value}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold mb-3'>Tempo di lettura (unità)</Form.Label>
              <Form.Control
                as="select"
                name="readTime.unit"
                value={formData.readTime.unit}
                onChange={handleInputChange}
              >
                <option value="minuti">Minuti</option>
                <option value="ore">Ore</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleUpdate} className='mt-3'>
        {isEditing ? (
              <>
                  <Spinner animation="grow" size="sm" /> Caricamento...
              </>
          ) : (
              "Salva modifica"
        )}
        </Button>
      </Form>
    </div>
  );
}
