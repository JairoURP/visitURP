import { useState } from "react";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";

export default function RegisterVisit() {
  const [formData, setFormData] = useState({
    ID_Visitante: "",
    Fecha_Visita: "",
    Hora_Visita: "",
    Semestre: "",
    Provincia_O: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowModal(true); 
      } else {
        setError("Error al registrar la visita");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error en la solicitud");
    }
  };

  const closeModal = () => {
    setShowModal(false); 
    setFormData({ 
      ID_Visitante: "",
      Fecha_Visita: "",
      Hora_Visita: "",
      Semestre: "",
      Provincia_O: "",
    });
  };

  return (
    <PageComponent title="Registrar una nueva visita presencial">
      <form className="shadow sm:overflow-hidden sm:rounded-md bg-white p-6" onSubmit={handleSubmit}>
        <div className="mb-4 text-gray-600">
          Es obligatorio que cada visitante registre la siguiente información: fecha, hora, identificación, semestre académico y provincia de origen.
        </div>
        {error && <div className="bg-red-500 text-white py-3 px-3">{error}</div>}

        {[
          { label: "Identificación de Visitante", name: "ID_Visitante" },
          { label: "Fecha de Visita", name: "Fecha_Visita", type: "date" },
          { label: "Hora de Visita", name: "Hora_Visita", type: "time" },
          { label: "Semestre Académico", name: "Semestre" },
          { label: "Provincia de Origen", name: "Provincia_O" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="mb-4 flex items-center space-x-2">
            <label className="block text-sm font-medium text-gray-700 w-1/3" htmlFor={name}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-2/3 rounded-md border-2 border-green-300 bg-green-50 focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>
        ))}

        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <TButton type="submit" className="bg-green-700 text-white px-8 py-2 rounded-md hover:bg-green-800 transition duration-200">
            Guardar
          </TButton>
        </div>
      </form>

      {showModal && (
       <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
       <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
         <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
           <div className="text-4xl">✅</div> 
         </div>
         <h2 className="text-lg font-bold mt-4">Visitante agregado</h2>
         <p className="text-gray-600 mt-2">El visitante ha sido agregado exitosamente.</p>
         <button
           onClick={closeModal}
           className="mt-6 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition duration-200"
         >
           OK
         </button>
       </div>
     </div>
      )}
    </PageComponent>
  );
}