import styled from "styled-components";
import footer from "../../assets/img/Footer.png";

const FooterEstilizado = styled.footer `
     padding: 60px 0;
    display: flex;
    justify-content: space-between;
    
    img{
        width: 100%;
    }

  

p {
    font-size: 14px;
    margin: 0;
  }
  @media (max-width: 768px) {
    padding: 15px;
    img {
      max-width: 300px;
    }
    p {
      font-size: 12px;
    }
  }

  @media (max-width: 480px) {
    img {
      max-width: 250px;
    }
    p {
      font-size: 10px;
    }
  }
`;


const Footer = () =>{

    return <FooterEstilizado>
        <img src={footer} alt= "Footer página" ></img>
        <p>Desarrollado por S.Esquivel en el programa Oracle One Education - Alura</p>
    </FooterEstilizado>
}

export default Footer;