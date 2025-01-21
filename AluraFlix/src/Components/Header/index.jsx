import styled from "styled-components";
import header from "../../assets/img/Navbar.png";

const HeaderEstilizado = styled.header `
    padding: 60px 0;
    display: flex;
    justify-content: space-between;
    img{
        width: 100%;
    }
  `;


const Header = () =>{

    return <HeaderEstilizado>
        <img src={header} alt= "Encabezado Pagina" ></img>

    </HeaderEstilizado>
}

export default Header;