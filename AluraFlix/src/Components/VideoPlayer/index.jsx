import { useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { GlobalContext } from "../../Context/GlobalContext";

const VideoPlayer = () => {
  const { state, dispatch } = useContext(GlobalContext);

    useEffect(() => {
    const videoElement = document.querySelector("video");
    if (state.modalEditar && videoElement) {
      videoElement.pause(); 
    }
  }, [state.modalEditar]);

  if (!state.videoSeleccionado) return null;

  return (
    <div>
      <button onClick={() => dispatch({ type: "SET_VIDEO_SELECCIONADO", payload: null })}>
        Cerrar
      </button>
      <ReactPlayer url={state.videoSeleccionado.url} controls  />
    </div>
  );
};

export default VideoPlayer;
