import { NavLink as Link } from 'react-router-dom';
import styled from "styled-components";
import Emotion from "../components/Emotion";
import TimeGraph from "../components/TimeGraph";
import Sentiment from "../components/Sentiment";
import { Custom } from "../components/Interface";
import { useState, useEffect } from "react";
import { GetTextData, GetImageData } from "../api/backend";
import axios from "axios";
function Home() {
  const [textData, setTextData] = useState([]);
  const [graphdata, setGraphData] = useState<any>();
  const [currentMood, setCurrentMood] = useState<String>();
  useEffect(() => {
    GetTextData().then((e) => {
      setTextData(e);
    });
    GetImageData().then((e) => {
      setGraphData(e);
    });
  });
  useEffect(() => {
    let max = 0;
    for (const item in graphdata) {
      if (graphdata[item] > max) {
        max = graphdata[item];
        setCurrentMood(item);
      }
    }
  }, [graphdata]);

  useEffect(() => {
    setInterval(async () => {
      const request = await axios.post("http://43.204.11.138:3001/text", {});
    }, 300000);
  });

  return (
    <MainContainer>
      <BarContainer>
        <BarContainerHead>
          <Text size={"30px"}>Emotions</Text>
          <InfoContainer>
            <Text size={"20px"}> Current Emotion : </Text>
            <Text>{currentMood?.toUpperCase()}</Text>
          </InfoContainer>
        </BarContainerHead>
        <BarGraph>
          <Emotion />
        </BarGraph>
        <Link to="/emotion">
          <Button >more details</Button>
        </Link>        
        <Text size={"30px"}>Emotions in Time Series</Text>
        <LineGraph>
          <TimeGraph />
        </LineGraph>
      </BarContainer>

      <TextContainer>
        <Text style={{ marginBottom: "10px" }} size={"30px"}>
          Topics
        </Text>
        <TextBox>
          {textData?.map((data: any) => (
            <>
              <ListContainer>
                <Text size={"12px"}>{data.Topic1}</Text>
              </ListContainer>
              <ListContainer>
                <Text size={"12px"}>{data.Topic2}</Text>
              </ListContainer>
              <ListContainer>
                <Text size={"12px"}>{data.Topic3}</Text>
              </ListContainer>
            </>
          ))}
        </TextBox>
        <Text size={"30px"}>Sentiment</Text>
        <BarGraph>
          <Sentiment />
        </BarGraph>
        <Link to="/sentiment">
          <Button >more details</Button>
        </Link>  
      </TextContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0;
  margin-top: 20px;
  padding:0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display:flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const BarContainer = styled.div`
  height: 100%;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BarContainerHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-center;
  min-width: 80%;
  height: 15%;
  margin-top: 10px;
`;

const InfoContainer = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  justify-content: flex-center;
  align-items: center;
  @media (max-width: 720px) {
    margin-bottom: 15px;
  }
`;

const BarGraph = styled.section`
  background-color: #ffff;
  width: 80%;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const LineGraph = styled.section`
  background-color: #ffff;
  width: 80%;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
  border-radius: 10px;
  @media (max-width: 720px) {
    min-width: 100%;
  }
`;

const TextBox = styled.div`
  height: 250px;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-top: 50px;
  border-radius: 10px;
  margin: 20px 0;
  @media (max-width: 720px) {
    height: 150px;
  }
`;

const ListContainer = styled.div`
  height: 50px;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f5;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Text = styled.p<Custom>`
  font-family: "Roboto";
  font-weight: medium;
  font-size: ${(p) => {
    return p.size ? p.size : "24px";
  }};
  margin: 0;
  margin-right: 10px;
  text-align: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 5px 0px;
  cursor: pointer;
  // align-itemm: left;
`;

export default Home;


