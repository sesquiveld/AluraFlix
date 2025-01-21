import { styled } from "styled-components";
import { useState } from "react";
import banner from "../../assets/img/banner.png";
import player from  "../../assets/img/player.png";
import cerrarIcon from "../../assets/img/iconos/cerrar.png";
import ReactPlayer from "react-player";

const HeaderContainer = styled.div`
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
`;

const FigureEstilizada = styled.figure`
  background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};
  flex-grow: 1;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 728px;
  margin: 0;
  border-radius: 20px;
  max-width: 100%;
  background-size: cover;
`;

const TextContainer = styled.div`
  padding: 64px;
  max-width: 500px;
  color: #ffffff;
  justify-content: justify;
`;

const TituloEstilizado = styled.h1`
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
`;

const ContenidoEstilizado = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  margin-top: 16px;
`;

const VideoContainer = styled.div`
  position: relative;
  max-width: 400px;
  flex-shrink: 0;
  margin-right: 64px;
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
    opacity: 0.8;
  }
`;

const VideoThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
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



const Banner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = "https://www.youtube.com/watch?v=ov7vA5HFe6w";
//  const player = "https://img.youtube.com/vi/ov7vA5HFe6w/hqdefault.jpg";


  return (
    <HeaderContainer>
      <FigureEstilizada $backgroundImage={banner}>
        <TextContainer>
          <TituloEstilizado>Challenge React</TituloEstilizado>
          <CategoryButton color="#5DADE2" >
              Front End
          </CategoryButton>

          <ContenidoEstilizado>
            Este Challenge es una forma de aprendizaje. Es un mecanismo donde
            podrás comprometerte en la resolución de un problema para aplicar
            todos los conocimientos adquiridos en la formación React.
          </ContenidoEstilizado>
        </TextContainer>
        <VideoContainer>
        {!isPlaying ? ( 
          <VideoThumbnail          
            src={player}
            alt="Video Thumbnail"
            onClick={() => setIsPlaying(true)} 
          /> 
          ) : (
            <>
             <ReactPlayer
                url={videoUrl}
                controls
                playing
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      modestbranding: 1,
                      rel: 0,
                    },
                  },
                }}
              />
                   
              <CloseButton onClick={() => setIsPlaying(false)}>
                 <img src={cerrarIcon} alt="Cerrar" />
              </CloseButton>
            </>
          )}
        </VideoContainer>
      </FigureEstilizada>
    </HeaderContainer>
  );
};

export default Banner;
