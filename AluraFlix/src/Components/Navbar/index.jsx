import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
//import header from "../../assets/img/Navbar.png";

const NavbarContainer = styled.nav`
  width: 100%;
  background-color: #1c1c1c;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid #2d0bee;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }

`;

const Logo = styled.h1`
  color: #1e6ee9;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const Button = styled.button`
  background-color:black;
  color : #fff;
  border: 2px solid #2d0bee;
  padding: 10px 20px;
  border-radius: 8px;
  margin-right: 50px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(234, 235, 236, 0.7);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 0; 
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //<img src={header} alt= "Encabezado Pagina" ></img>
  return (
    <NavbarContainer>
      <Logo>ALURAFLIX </Logo>
      <ButtonsContainer>
        <Button onClick={() => navigate('/')}> 
          {isMobile ? <FaHome size={20} /> : 'HOME'}
        </Button>
        <Button onClick={() => navigate('/nuevo-video')}>
          {isMobile ? <FaPlus size={20} /> : 'NUEVO VIDEO'}
        </Button>
      </ButtonsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
