import React, { useState } from "react";
import Paragraph from "./Paragraph";
import { v4 as uuidv4 } from 'uuid';
import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import successIcon from "../assets/icons-check.png";

const DraftEditor = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Adiciona um novo parágrafo ao rascunho
  const addParagraph = () => {
    if (text.trim() === "") return;
    setParagraphs([...paragraphs, { id: uuidv4(), text }]);
    setText("");
  };

  // Salva o rascunho e exibe o modal de sucesso
  const saveDraft = () => {
    console.log("Rascunho salvo:", paragraphs);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Editor de Redação</h2>
      
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite seu parágrafo..."
        />
      </Form.Group>

      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <Button 
            variant="primary" 
            style={{ width: "200px" }}
            className="btn-sm" 
            onClick={addParagraph}
          >
            Adicionar Parágrafo
          </Button>
        </Col>
      </Row>

      <div className="mt-4">
        {paragraphs.length > 0 && (
          <h4 className="mt-4">Rascunho</h4>
        )}

        {paragraphs.map((p) => (
          <Paragraph key={p.id} text={p.text} />
        ))}

        {paragraphs.length > 0 && (
          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button 
                variant="success" 
                style={{ width: "200px" }} 
                className="btn-sm" 
                onClick={saveDraft}
              >
                Salvar Rascunho
              </Button>
            </Col>
          </Row>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <img 
            src={successIcon} 
            alt="Ícone de sucesso" 
            style={{ width: '50px', height: '50px' }} 
          />
        </Modal.Header>
        <Modal.Body>Rascunho salvo com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DraftEditor;
