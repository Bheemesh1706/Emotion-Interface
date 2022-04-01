import styled from 'styled-components';
import Emotion from './components/Emotion';
import { Custom } from './components/Interface';


function App() {
  return (
<MainContainer>
  <BarContainer>
    <BarContainerHead>
      <Text size={"40px"} >Emotions</Text>
      <InfoContainer>
        <Text size={"20px"} > Current Emotion : </Text>
        <Text >Surprise</Text>
      </InfoContainer>
    </BarContainerHead>
    <BarGraph>
      <Emotion/>
    </BarGraph>  
  </BarContainer>

  <TextContainer>
  <Text style={{marginBottom: "10px"}}>Topics</Text>
    <TextBox>
      <ListContainer>
        <Text>Title</Text>
      </ListContainer>
    </TextBox>
  </TextContainer>
</MainContainer>
  );
}



const MainContainer = styled.div`
  margin: 0;
  padding:0;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  background-color: #F0F0F5;
  display:flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const BarContainer = styled.div`
  height:100%;
  min-width:60%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
`;

const BarContainerHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  min-width: 80%;
  height: 15%;
`;

const InfoContainer = styled.div`
  height: 25%;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
 
`;

const BarGraph = styled.section`
  background-color: #ffff;
  width: 80%;
`;

const TextContainer = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: flex-start;
  @media (max-width: 720px) {
   min-width: 100%;
  }
`;

const TextBox = styled.div`
  height:80%;
  width: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-top: 50px;

`;

const ListContainer = styled.div`
  height: 50px;
  width:60%;
  display: flex;
  justify-content:center;
  align-items: center;
  background-color:  #F0F0F5;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Text = styled.p<Custom>`
  font-family: "Roboto";
  font-weight: medium;
  font-size: ${(p)=>{
      return p.size ? p.size:"24px";
  }};
  margin: 0;
  margin-right: 10px;
`;



export default App;
