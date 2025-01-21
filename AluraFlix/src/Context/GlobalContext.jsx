import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

const initialState = {    
    consulta:"",
    videos: [],
    videonuevo:null,
    videoSeleccionado: null,
    modalAbierto: false,
    modalEditar: false,
    categoria:"todos",
    editar:false,
    eliminar:false,
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CONSULTA':
            return { ...state, consulta: action.payload };
        case 'SET_VIDEOS':
            return { ...state, videos: action.payload };
            case 'SET_ADICIONAR_VIDEO':
                return { ...state, videonuevo: action.payload };    
        case 'SET_VIDEO_SELECCIONADO':
            return {
                ...state,
                videoSeleccionado: action.payload,
            };
        case 'SET_VIDEO_EDITAR':
            return {
                ...state,
                modalEditar: true,
                videoSeleccionado: action.payload,
            };
        case 'SET_MODAL_EDITAR_CERRAR':
            return {
                ...state,
                modalEditar: false,
                videoSeleccionado: null,
            };

        case "ACTUALIZAR_VIDEO":{
            const videosActualizados = state.videos.map((video) =>
                    video.id === action.payload.id ? action.payload : video
                );
            return {
                    ...state,
                    videos: videosActualizados,
                    modalEditar: false, 
                    videoSeleccionado: null,
                };    }
        case 'SET_VIDEO_ELIMINAR':
            return{
                ...state, videoSeleccionado: action.payload      
            };
        case 'SET_CATEGORIA': 
            return {
                ...state,
                categoria: action.payload,
            };    
    default:
            return state;
    }
};

const GlobalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    
    useEffect(() => {
        const getData = async () => {
            const res = await fetch('http://localhost:3000/videos');
            const data = await res.json();
            //setVideos([...data]);
            dispatch({ type: 'SET_VIDEOS', payload: data })
        }
         getData();
    }, []);



    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default GlobalContextProvider;