import styled from 'styled-components';
import Emotion from './components/Emotion';
import { Custom } from './components/Interface';
import { useState,useEffect } from 'react';
import { GetTextData,GetImageData } from './api/backend';
function App() {

  const [textData,setTextData]= useState([]);
  const [graphdata,setGraphData] = useState<any>();
  const [currentMood,setCurrentMood] = useState<String>();
  useEffect(()=>{
    GetTextData().then((e)=>{
      setTextData(e);
    });
    GetImageData().then((e)=>{
      setGraphData(e)
    });
  });
  useEffect(()=>{
    let max=0;
    for (const item in  graphdata) {
      if(graphdata[item]>max)
      {
        max = graphdata[item];
        setCurrentMood(item);
      }
    }
  },[graphdata])

  return (
<MainContainer>
  <BarContainer>
      <BarContainerHead>
        <Text size={"40px"} >Emotions</Text>
        <InfoContainer>
          <Text size={"20px"} > Current Emotion : </Text>
          <Text >{currentMood?.toUpperCase()}</Text>
        </InfoContainer>
      </BarContainerHead>
      <BarGraph>
        <Emotion/>
      </BarGraph>  
  </BarContainer>

  <TextContainer>
    <Text style={{marginBottom: "10px"}}>Topics</Text>
      <TextBox>
    {textData?.map((data:any)=><> <ListContainer><Text size={"12px"}>{data.Topic1}</Text></ListContainer>
    <ListContainer><Text size={"12px"}>{data.Topic2}</Text></ListContainer>
    <ListContainer><Text size={"12px"}>{data.Topic3}</Text></ListContainer></>)}
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
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 720px) {
    margin-bottom: 10px;
  }
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
  justify-content:flex-start;
  align-items: flex-start;
  margin-top:16px;
  @media (max-width: 720px) {
   min-width: 100%;
   margin-left: 60px;
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
  text-align: center;
`;



export default App;
