import  { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../Context/GlobalContext";
import cerrarIcon from "../../assets/img/iconos/cerrar.png";


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #0d1a26;
  color: #ffffff;
  border-radius: 10px;
  padding: 20px 40px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  gap : 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 28px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const ModalHeader = styled.h3`
  text-align: center;
  font-size: 24px;
  color: #3498db;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #3498db;
  padding: 50px; 
  font-size: 16px;
  gap : 25px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #3498db;
  border-radius: 5px;
  background: #14202a;
  width: 300px;
  color: #ffffff;
  margin-left: 150px;
  
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #3498db;
  border-radius: 5px;
  background: #14202a;
  color: #ffffff;
  width: 300px;
  margin-left: 150px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #3498db;
  border-radius: 5px;
  background: #14202a;
  width: 300px;
  margin-left: 150px;
  color: #ffffff;
  resize: none;
  gap: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-left: 80px;
  margin-right: 60px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 50px;
  border-color: #3498db;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: #ffffff;

  background-color: black;

  &:hover {
    opacity: 1;
  }
`;



const ModalEditar = () => {
 
  const { state, dispatch } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    id: state.videoSeleccionado?.id || "",
    titulo: state.videoSeleccionado?.titulo || "",
    descripcion: state.videoSeleccionado?.descripcion || "",
    imagen: state.videoSeleccionado?.imagen || "",
    url: state.videoSeleccionado?.url || "",
    categoria: state.videoSeleccionado?.categoria || "",
  });

  const categorias = ["Front End", "Back End", "Innovación y Gestión", "Inteligencia Artificial"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/videos/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        dispatch({ type: "ACTUALIZAR_VIDEO", payload: updatedVideo });
      } else {
        console.error("Error al actualizar el video.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      id: formData.id,
      titulo: "",
      categoria: "",
      imagen: "",
      url:"",
      descripcion: "",
    });
  };

  const handleClose = () => {
    dispatch({ type: "SET_MODAL_EDITAR_CERRAR" });
  };

  return (
    state.modalEditar && (
      <ModalOverlay>
        <ModalContainer>
        <CloseButton onClick={handleClose}> <img src={cerrarIcon} alt="Cerrar"/></CloseButton> 
          <ModalHeader>Editar Card</ModalHeader>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="titulo">Título</Label>
                  <Input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                  />
              </div>  
              <div>
                  <Label htmlFor="categoria">Categoría</Label>  
                  <Select
                    id="categoria"
                    label= "Categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="Imagen">IMAGEN</Label>
                  <Input
                    id="imagen"
                    type="url"
                    label= "Imagen"
                    name="imagen"
                    placeholder="Imagen de la URL"
                    value={formData.imagen}
                    onChange={handleInputChange}
                    required
                  />
                </div>  
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    name="url"
                    placeholder="URL de la imagen" 
                    value={formData.url}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="descripcion">Descripción</Label>
                    <TextArea
                      id="descripcion"
                      type="text"
                      name="descripcion"
                      rows="4"
                      placeholder="Descripción"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      required
                    />
                </div>  
                  <ButtonContainer>
                    <Button type="submit" >
                      Guardar
                    </Button>
                    <Button type="button"  onClick={handleClear}>
                      Limpiar
                    </Button>
                  </ButtonContainer>
          </Form>
        </ModalContainer>
      </ModalOverlay>
    )
  );
};

export default ModalEditar;
