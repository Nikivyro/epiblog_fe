import React, { useState, useEffect } from 'react';

export default function EditPostModal({ _id, initialData, onUpdate }) {
  const [formData, setFormData] = useState(initialData);
  const [coverFile, setCoverFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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
        const cloudinaryResponse = await fetch(`${process.env.REACT_APP_URL_ENDPOINT}/posts/${_id}/uploadCover`, {
          method: 'POST',
          body: formDataForCloudinary,
        });

        if (cloudinaryResponse.status === 200) {
          const cloudinaryData = await cloudinaryResponse.json();
          formData.cover = cloudinaryData.cover;
        } else {
          setErrorMessage('Errore nell\'upload della copertina su Cloudinary');
          return;
        }
      }

      const response = await fetch(`${process.env.REACT_APP_URL_ENDPOINT}/posts/update/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        onUpdate();
      } else {
        setErrorMessage('Errore nell\'aggiornamento del post');
      }
    } catch (error) {
      console.error('Errore nell\'aggiornamento del post', error);
      setErrorMessage('Errore interno del server');
    }
  };

  return (
    <div className="edit-post-form">
      <h3>Modifica Post</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form>
        <div>
          <label>Titolo</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Categoria</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Copertina</label>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleCoverChange}
          />
        </div>
        <div>
          <label>Contenuto</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tempo di lettura (valore)</label>
          <input
            type="number"
            name="readTime.value"
            value={formData.readTime.value}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tempo di lettura (unità)</label>
          <select
            name="readTime.unit"
            value={formData.readTime.unit}
            onChange={handleInputChange}
          >
            <option value="minuti">Minuti</option>
            <option value="ore">Ore</option>
          </select>
        </div>
        <button type="button" onClick={handleUpdate}>
          Salva Modifiche
        </button>
      </form>
    </div>
  );
}
