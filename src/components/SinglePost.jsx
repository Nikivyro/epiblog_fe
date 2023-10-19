import React, { useState } from 'react';
import EditPostModal from './EditPostModal';

export default function SinglePost({ _id, title, cover, category, author, readTime, content }) {
  // Stato per gestire la visualizzazione del modal di modifica
  const [isEditing, setIsEditing] = useState(false);

  // Dati del post attualmente visualizzato
  const postData = {
    _id,
    title,
    cover,
    category,
    readTime: {
      value: readTime.value,
      unit: readTime.unit,
    },
    author: {
      avatar: author ? author.avatar : null,
      firstName: author ? author.firstName : null,
    },
    content,
  };

  // Funzione per gestire l'apertura del modal di modifica
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Funzione per gestire la chiusura del modal di modifica
  const handleModalClose = () => {
    setIsEditing(false);
  };

  return (
    <div key={_id}>
      <h3>{title}</h3>
      <p>{_id}</p>
      <img src={cover} alt={title} />
      <p>Category: {category}</p>
      <p>Content: {content}</p>
      {author && (
        <>
          <img src={author.avatar} alt={author.name} width={30} />
          <p>Autore:{author.firstName}</p>
        </>
      )}
      {readTime && (
        <>
          <p>Valore: {readTime.value}</p>
          <p>Unità: {readTime.unit}</p>
        </>
      )}
      <button onClick={handleEditClick}>Modifica Post</button>
      {isEditing && (
        <EditPostModal
          _id={_id}
          initialData={postData}
          onUpdate={handleModalClose}
        />
      )}
    </div>
  );
}
