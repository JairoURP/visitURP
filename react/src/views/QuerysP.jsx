import React, { useEffect, useState } from 'react';
import { FaFolder } from 'react-icons/fa'; 
import './QuerysP.css';

export default function QuerysP() {
  const [answers, setAnswers] = useState([]);
  const [filteredAnswers, setFilteredAnswers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [answerId, setAnswerId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/survey-question-answers`)
      .then((response) => response.json())
      .then((data) => {
        setAnswers(data);
        setFilteredAnswers(data);

        // Obtener categorías únicas
        const uniqueCategories = [...new Set(data.map((answer) => answer.survey_answer_id))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error al obtener respuestas:', error));
  }, []);

  const handleAddAnswer = () => {
    if (!questionId || !answerId || !answerText) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    const newEntry = {
      survey_question_id: parseInt(questionId, 10),
      survey_answer_id: parseInt(answerId, 10),
      answer: answerText,
    };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/survey-question-answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al guardar la respuesta.');
        }
        return response.json();
      })
      .then((data) => {
        const updatedAnswers = [...answers, data];
        setAnswers(updatedAnswers);
        setFilteredAnswers(updatedAnswers);
        setQuestionId('');
        setAnswerId('');
        setAnswerText('');
        setIsModalOpen(false);
        setSuccessMessage('¡Respuesta agregada exitosamente!');
        setErrorMessage('');

        // Actualizar categorías si es necesario
        if (!categories.includes(data.survey_answer_id)) {
          setCategories([...categories, data.survey_answer_id]);
        }
      })
      .catch((error) => {
        console.error('Error al agregar la respuesta:', error);
        setErrorMessage('Error al agregar la respuesta.');
      });
  };

  const handleFilterChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === '') {
      setFilteredAnswers(answers);
    } else {
      setFilteredAnswers(answers.filter((answer) => answer.survey_answer_id === parseInt(category, 10)));
    }
  };

  return (
    <div className="querys-container">
      <h1 className="Title">Preguntas Predefenidas</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="toolbar">
        <select value={selectedCategory} onChange={handleFilterChange} className="category-selector">
          <option value="">Todas las Categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              Categoría {category}
            </option>
          ))}
        </select>

        <button onClick={() => setIsModalOpen(true)} className="add-button">
          Agregar Respuesta
        </button>
      </div>

      <table className="answers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pregunta ID</th>
            <th>Categoria</th>
            <th>Respuesta</th>
            <th>Creado el</th>
            <th>Actualizado el</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnswers.map((answer) => (
            <tr key={answer.id}>
              <td>{answer.id}</td>
              <td>{answer.survey_question_id}</td>
              <td className="answer-id-column">
                {answer.survey_answer_id}
                <FaFolder className="folder-icon" />
              </td>
              <td>{answer.answer}</td>
              <td>{new Date(answer.created_at).toLocaleString()}</td>
              <td>{new Date(answer.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-Querys">
          <div className="modal-Querys-content">
            <h2 className="modal-Querys-title">Agregar Nueva Respuesta</h2>
            <label className="label-categoria1">
              Categoria:
              <input
                className="input-categoria1"
                type="number"
                value={answerId}
                onChange={(e) => setAnswerId(e.target.value)}
              />
            </label>
            <label className="label-pregunta2">
              Pregunta ID:
              <input
                className="input-pregunta2" 
                type="number"
                value={questionId}
                onChange={(e) => setQuestionId(e.target.value)}
              />
            </label>
            <label className="label-respuesta3">
              Respuesta:
              <input
                className="input-respuesta3"
                type="text"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
              />
            </label>
            <div className="modal-Querys-btn-container">
            <button onClick={handleAddAnswer} className="modal-btn-Guardar1">
              Guardar
            </button>
            <button onClick={() => setIsModalOpen(false)} className="modal-btn-Cancelar2">
              Cancelar
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
