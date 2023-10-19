import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditPostModal({ _id, initialData, onUpdate }) {
    const [postData, setPostData] = useState(initialData);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialData.cover || null);

    useEffect(() => {
        setPostData(initialData);
        setImagePreview(initialData.cover || null);
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const onChangeSetFile = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Mostra un'anteprima dell'immagine
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
        console.log('Nuovo file caricato:', selectedFile);
    };

    const handleEditPost = async (e) => {
        e.preventDefault();
        try {
            if (file) {
                // Upload del nuovo file
                const uploadedCoverURL = await uploadFile(file, _id); // Passa _id come parametro
                setPostData({ ...postData, cover: uploadedCoverURL });
                console.log('URL dell\'immagine nell\'oggetto postData:', postData.cover);
            }
    
            // Esegui la richiesta PATCH al server per aggiornare il post
            const response = await axios.patch(`${process.env.REACT_APP_URL_ENDPOINT}/posts/update/${_id}`, postData);
    
            if (response.status === 200) {
                // Se l'aggiornamento ha avuto successo, chiudi il modal e notifica l'aggiornamento
                onUpdate();
            } else {
                console.error('Errore durante l\'aggiornamento del post');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const uploadFile = async (cover, _id) => {
        const fileData = new FormData();
        fileData.append('cover', cover);
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/posts/${_id}/editCoverCloud`, fileData);
            const uploadedCoverURL = response.data.cover;
            console.log('URL dell\'immagine caricata su Cloudinary:', uploadedCoverURL);
            return uploadedCoverURL;
        } catch (error) {
            console.error(error, 'Errore in uploadFile');
            throw error;
        }
    };

    // Funzione per effettuare la richiesta PATCH al server
    const updateCoverForPost = async (postId, coverURL) => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_URL_ENDPOINT}/posts/update/${postId}`, { cover: coverURL });
            return response;
        } catch (error) {
            console.error(error, 'Errore durante la richiesta PATCH per aggiornare la copertina del post');
            throw error;
        }
    };


    return (
        <div>
            <h3>Modifica Post</h3>
            <form>
                <div>
                    <label htmlFor="title">Titolo:</label>
                    <input
                        type="text"
                        name="title"
                        value={postData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Categoria:</label>
                    <input
                        type="text"
                        name="category"
                        value={postData.category}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="content">Contenuto:</label>
                    <textarea
                        name="content"
                        value={postData.content}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="cover">Copertina:</label>
                    <input
                        type="file"
                        name="cover"
                        onChange={onChangeSetFile}
                    />
                </div>
                <div>
                    <label htmlFor="readTime.value">Tempo di Lettura (Valore):</label>
                    <input
                        type="number"
                        name="readTime.value"
                        value={postData.readTime.value}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="readTime.unit">Tempo di Lettura (Unità):</label>
                    <select
                        name="readTime.unit"
                        value={postData.readTime.unit}
                        onChange={handleInputChange}
                    >
                        <option value="minuti">Minuti</option>
                        <option value="ore">Ore</option>
                    </select>
                </div>
                {imagePreview && (
                    <img src={imagePreview} alt="Anteprima immagine" style={{ maxWidth: "100%" }} />
                )}
                <button onClick={handleEditPost}>Salva Modifiche</button>
            </form>
        </div>
    );
}

export default EditPostModal;
