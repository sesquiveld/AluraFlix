import styled from "styled-components";
import Card from "./Card";
import { GlobalContext } from "../../Context/GlobalContext";
import { useContext } from "react";
import VideoPlayer from "../VideoPlayer";
import ModalEditar from "../ModalEditar";

const CategoriaContainer = styled.div`
  margin-bottom: 32px;
  padding: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap; 
`;

const CategoryButton = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(234, 235, 236, 0.7);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const CategoriaSection = styled.div`
  margin-bottom: 32px;
`;

const CategoriaTitulo = styled.h2`
  text-align: center;
  color: ${(props) => props.color};
  margin-bottom: 16px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Galeria = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const categorias = [
    { nombre: "Front End", color: "#5DADE2" },
    { nombre: "Back End", color: "#58D68D" },
    { nombre: "Innovación y Gestión", color: "#F4D03F" },
    { nombre: "Inteligencia Artificial", color: "#d81c6a" },
  ];

  const handleEdit = (video) => {
    dispatch({ type: "SET_VIDEO_EDITAR", payload: video });
    dispatch({ type: "SET_VIDEO_SELECCIONADO", payload: video });
  };

  const handleDelete = async (video) => {
    try {
      const response = await fetch(`http://localhost:3000/videos/${video.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch({
          type: "SET_VIDEOS",
          payload: state.videos.filter((v) => v.id !== video.id),
        });
      } else {
        console.error("Error al eliminar el video en la base de datos.");
      }
    } catch (error) {
      console.error("Error al eliminar el video:", error);
    }
  };

  return (
    <CategoriaContainer>
      <ButtonGroup>
        {categorias.map((cat) => (
          <CategoryButton
            key={cat.nombre}
            color={cat.color}
            onClick={() => dispatch({ type: "SET_CATEGORIA", payload: cat.nombre })}
          >
            {cat.nombre}
          </CategoryButton>
        ))}
        <CategoryButton
          color="#7F8C8D"
          onClick={() => dispatch({ type: "SET_CATEGORIA", payload: "todos" })}
        >
          Todos
        </CategoryButton>
      </ButtonGroup>

      {state.categoria === "todos"
        ? categorias.map((cat) => (
            <CategoriaSection key={cat.nombre}>
              <CategoriaTitulo color={cat.color}>{cat.nombre}</CategoriaTitulo>
              <VideosGrid>
                {state.videos
                  .filter((video) => video.categoria === cat.nombre)
                  .map((video) => (
                    <Card
                      key={video.id}
                      video={video}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </VideosGrid>
            </CategoriaSection>
          ))
        : (
          <CategoriaSection>
            <CategoriaTitulo color={categorias.find((c) => c.nombre === state.categoria)?.color}>
              {state.categoria}
            </CategoriaTitulo>
            <VideosGrid>
              {state.videos
                .filter((video) => video.categoria === state.categoria)
                .map((video) => (
                  <Card
                    key={video.id}
                    video={video}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
            </VideosGrid>
          </CategoriaSection>
        )}

      {state.modalEditar && <ModalEditar />}
      <VideoPlayer />
    </CategoriaContainer>
  );
};

export default Galeria;
