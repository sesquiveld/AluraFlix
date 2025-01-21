
import { styled } from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import categorias from "./categorias.json";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #1c1c1c;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(25, 9, 243, 0.5);
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  background-color: #333;
  color: #fff;

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "red" : "#007bff")};
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #333;
  color: #fff;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #333;
  color: #fff;
  resize: none;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 2px solid #2d0bee;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background-color: black;
 

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(234, 235, 236, 0.7);
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 0;
  }
`;

const Fondo = styled.div`
  background: black;
  width: 100%;
  height: 100%;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  margin-top: -10px;
`;

const NuevoVideo = () => {

  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    imagen: "",
    url: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo) newErrors.titulo = "El título es obligatorio.";
    if (!formData.categoria) newErrors.categoria = "Debe seleccionar una categoría.";
    if (!formData.imagen) newErrors.imagen = "El enlace de la imagen es obligatorio.";
    if (!formData.url) newErrors.video = "El enlace del video es obligatorio.";
    return newErrors;
  };

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
     try {
      const response = await fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Video añadido exitosamente");
        setFormData({ titulo: "", url: "", imagen: "", categoria: "Frontend", descripcion: "" });
      } else {
        alert("Error al añadir el video");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

  };

  const handleClear = () => {
    setFormData({
      titulo: "",
      categoria: "",
      url:"",
      imagen: "",
      descripcion: "",
    });
  };

  return (
    <>
      <Fondo>
        <Navbar />
        <FormContainer>
          <Title>Nuevo Video</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              
              type="text"
              name="titulo"
              placeholder="Ingrese el título"
              value={formData.titulo}
              onChange={handleChange}
              error={!!errors.titulo}
            />
            {errors.titulo && <ErrorMessage>{errors.titulo}</ErrorMessage>}
            <Select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              error={!!errors.categoria}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categorias) => (
                <option key={categorias.id} value={categorias.titulo}>
                  {categorias.titulo}
                </option>
              ))}
            </Select>
            {errors.categoria && <ErrorMessage>{errors.categoria}</ErrorMessage>}
            <Input
              type="url"
              name="imagen"
              placeholder="Enlace de la imagen"
              value={formData.imagen}
              onChange={handleChange}
              error={!!errors.imagen}
            />
            {errors.imagen && <ErrorMessage>{errors.imagen}</ErrorMessage>}
            <Input
              type="url"
              name="url"
              placeholder="Enlace del video"
              value={formData.video}
              onChange={handleChange}
              error={!!errors.video}
            />
            {errors.video && <ErrorMessage>{errors.video}</ErrorMessage>}
            <TextArea
              rows="4"
              name="descripcion"
              placeholder="Descripción del video"
              value={formData.descripcion}
              onChange={handleChange}
            ></TextArea>
            <ButtonGroup>
              <Button type="submit" color="#007bff">
                Guardar
              </Button>
              <Button type="button" color="#333" onClick={handleClear}>
                Limpiar
              </Button>
            </ButtonGroup>
          </Form>
        </FormContainer>
        <Footer />
      </Fondo>
    </>
  );
};

export default NuevoVideo;
