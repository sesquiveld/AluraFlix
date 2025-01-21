import styled from "styled-components";
import {  useState } from "react";
import PropTypes from "prop-types";
import cerrarIcon from "../../../assets/img/iconos/cerrar.png";
import eliminar from "../../../assets/img/eliminar.png";
import editar from "../../../assets/img/editar.png";
import ReactPlayer from "react-player";

const CardContainer = styled.div`
  border: 3px solid
    ${(props) =>
      props.color === "Front End"
        ? "#5DADE2"
        : props.color === "Back End"
        ? "#58D68D"
        : props.color === "Innovación y Gestión"
        ? "#F4D03F"
        : props.color === "Inteligencia Artificial"
        ? "#d81c6a"
        : "#7F8C8D"};
  padding: 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px; /* Mantener tamaño fijo */
  margin: 0 auto; /* Centrar la tarjeta */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(234, 235, 236, 0.7);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-color: #0a3fec;
  border: 3px solid
    ${(props) =>
      props.color === "Front End"
        ? "#5DADE2"
        : props.color === "Back End"
        ? "#58D68D"
        : props.color === "Innovación y Gestión"
        ? "#F4D03F"
        : props.color === "Inteligencia Artificial"
        ? "#d81c6a"
        : "#7F8C8D"};
  border-radius: 10px;
  cursor: pointer;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 160px;
  border: 3px solid
    ${(props) =>
      props.color === "Front End"
        ? "#5DADE2"
        : props.color === "Back End"
        ? "#58D68D"
        : props.color === "Innovación y Gestión"
        ? "#F4D03F"
        : props.color === "Inteligencia Artificial"
        ? "#d81c6a"
        : "#7F8C8D"};
  border-radius: 10px;
  position: relative;
`;


const CardActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px;
  gap: 10 px; 
`;

const Button = styled.button`
    cursor: pointer;
    background-color: black;
    border:none;
    color: #fff;
    font-size: smaller;
    display: flex;
    align-items: center;
    gap: 8px; 
    
 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;


const Card = ({ video, onEdit, onDelete }) => {
  
  
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <CardContainer  color={video.categoria}>
      {!isPlaying ? ( 
        <CardImage  
            src={video.imagen}
            alt={video.titulo}
            onClick={() => setIsPlaying(true)}
            color={video.categoria}
        />
        ) : (
          <VideoWrapper color={video.categoria}>
          <ReactPlayer
              url={video.url}
              controls
              playing
              volume={1} 
              width="100%"
              height="160px"
              onEnded={() => setIsPlaying(false)}
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                  },
                },
              }}
          />
          <CloseButton onClick={() => setIsPlaying(false)}>
              <img src={cerrarIcon} alt="Cerrar" />
          </CloseButton>
          </VideoWrapper>
      )}
      <CardActions>
        <Button onClick={() => onEdit(video)}> 
          <img src={editar} alt="Editar" width="20" />
          Editar
        </Button >
        <Button  onClick={() => onDelete(video)}> 
            <img src={eliminar} alt="Eliminar" width="20" />           
            Borrar
        </Button>

      </CardActions>
    
    </CardContainer>
  );
};

Card.propTypes = {
  video: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  };

export default Card;



