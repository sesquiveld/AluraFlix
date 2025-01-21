import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Galeria from "./Components/Galeria";
import GlobalContext from "./Context/GlobalContext";

const Fondo = styled.div`
  background-color: black;
  width: 100%;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
`;

const App = () => {
  
  return (
    <GlobalContext>
      <Fondo>
        <GlobalStyles />
        <AppContainer>
          <Navbar />
          <Banner/>
           <Galeria></Galeria>
          <Footer />
        </AppContainer>
     </Fondo>
     
    </GlobalContext>
    
  );
};

export default App;

