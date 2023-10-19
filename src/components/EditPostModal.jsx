import React, { useState, useEffect } from 'react';

export default function EditPostModal({ _id, initialData, onUpdate }) {
  const [formData, setFormData] = useState(initialData);
  
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

  const handleUpdate = async () => {
    try {
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
        console.error('Errore nell\'aggiornamento del post');
      }
    } catch (error) {
      console.error('Errore nell\'aggiornamento del post', error);
    }
  };

  return (
    <div className="edit-post-form">
      <h3>Modifica Post</h3>
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
            type="text"
            name="cover"
            value={formData.cover}
            onChange={handleInputChange}
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
        <div>
          <label>Autore (avatar)</label>
          <input
            type="text"
            name="author.avatar"
            value={formData.author.avatar}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Autore (firstName)</label>
          <input
            type="text"
            name="author.firstName"
            value={formData.author.firstName}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleUpdate}>
          Salva Modifiche
        </button>
      </form>
    </div>
  );
}
