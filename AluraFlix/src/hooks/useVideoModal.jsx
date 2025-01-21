import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";


function useVideoModal() {
    const { state, dispatch } = useContext(GlobalContext);

    const abrirModal = (video) => {
        dispatch({ type: 'SET_FOTO_SELECCIONAD', payload: video})
    }


    const cerrarModal = () => {
        dispatch({ type: 'SET_FOTO_SELECCIONAD', payload: null })
    }

    const videoSeleccionado = state.videoSeleccionado;

    const estaAbiertoModal = state.modalAbierto;

    return { videoSeleccionado, estaAbiertoModal, abrirModal, cerrarModal }
}

export default useVideoModal;