import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';

export default function AddPostModal({ closeModal, refreshPosts }) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.id);

  const onChangeSetFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append('cover', cover);

    try {
      const response = await fetch(`${process.env.REACT_APP_URL_ENDPOINT}/posts/cloudUpload`, {
        method: "POST",
        body: fileData
      });
      return await response.json();
    } catch (error) {
      console.error(error, 'Errore in uploadFile');
      throw error;
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        console.error('Caricare almeno un file');
        return;
      }

      setIsSubmitting(true);

      const uploadCover = await uploadFile(file);

      const readTimeValue = Number(formData.readTimeValue);
      const readTimeUnit = formData.readTimeUnit || 'minuti';
      const readTime = { value: readTimeValue, unit: readTimeUnit };
      const { readTimeValue: _, readTimeUnit: __, ...restData } = formData;

      const postData = {
        ...restData,
        readTime,
        cover: uploadCover.cover,
        author: currentUserId
      };

      const response = await fetch(`${process.env.REACT_APP_URL_ENDPOINT}/posts/create`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        closeModal(false);
        refreshPosts();
      } else {
        console.error('Errore nella richiesta di creazione del post.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Titolo post</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Titolo post"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Categoria post</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Categoria post"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                />
            </Form.Group>
            {imagePreview && (
                <img src={imagePreview} alt="Anteprima immagine" style={{ maxWidth: "100%" }} />
            )}
            <Form.Group>
                <Form.Label>Cover</Form.Label>
                <Form.Control
                    type="file"
                    onChange={onChangeSetFile}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tempo di lettura (valore)</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Tempo di lettura (valore)"
                    onChange={(e) => setFormData({ ...formData, readTimeValue: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tempo di lettura (unità)</Form.Label>
                <Form.Control
                    as="select"
                    onChange={(e) => setFormData({ ...formData, readTimeUnit: e.target.value })}
                >
                    <option value="minuti">Minuti</option>
                    <option value="ore">Ore</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Messaggio</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Messaggio..."
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                />
            </Form.Group>
            <div className="d-flex gap-2 mt-3">
                <Button variant="secondary" onClick={() => closeModal(false)}>Chiudi</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Spinner animation="grow" size="sm" /> Caricamento...
                        </>
                    ) : (
                        "Aggiungi"
                    )}
                </Button>
            </div>
        </Form>
    );
}
