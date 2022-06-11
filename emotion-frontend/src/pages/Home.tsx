import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import Emotion from "../components/Emotion";
import TimeGraph from "../components/TimeGraph";
import Sentiment from "../components/SentimentComp";
import DateTime from "../components/DateTime";
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
    setInterval(() => {
      const request = axios.post("http://43.204.11.138:3001/text", {});
    }, 60000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      const request1 = axios.post("http://43.204.11.138:3001/sentiment", {});
    }, 10000);
  }, []);

  const [imgUrl, setImgUrl] = useState<any>();

  useEffect(() => {
    GetImageData().then((e) => {
      console.log(e);
      setImgUrl(e);
    });
  });

  //   <NavBar>
  //   {/* <Text> Welcome to the Multimodal AI Engine Dashboard !!!</Text> */}
  // </NavBar>

  return (
    <>
      <MainContainer>
        <SideBar>
          <DateTime></DateTime>
        </SideBar>

        <BarContainer>
          <BarContainerHead>
          <Text size={"30px"}>Emotions</Text>
            <InfoContainer>
              <Text size={"20px"}> Current Emotion : </Text>
              <Text>{currentMood?.toUpperCase()}</Text>
              <Text>{}</Text>
              <img
                src={"data:image/jpeg;base64," + imgUrl?.ImageURL}
                width="70px"
                height="80px"
                alt="UserPhoto"
              />
            </InfoContainer>
          </BarContainerHead>
          <BarGraph>
            <Emotion />
          </BarGraph>
          {/* <Link to="/emotion">
            <Button >more details</Button>
          </Link>         */}
          <Text size={"30px"}>Emotions in Time Series</Text>
          <LineGraph>
            <TimeGraph />
          </LineGraph>
        </BarContainer>

        <TextContainer>
          <Text
            style={{ marginBottom: "10px", marginTop:"35px"}}
            size={"30px"}
          >
            Topics
          </Text>
          <TextBox>
            {textData?.map((data: any) => (
              <>
                <ListContainer>
                  <Text></Text>
                  <Text size={"16px"}>
                    {data.createdAt.split("T")[1].split(".")[0]} - {data.Topic1}
                  </Text>
                </ListContainer>
                <ListContainer>
                  <Text size={"16px"}>
                    {data.createdAt.split("T")[1].split(".")[0]} - {data.Topic2}
                  </Text>
                </ListContainer>
                <ListContainer>
                  <Text size={"16px"}>
                    {data.createdAt.split("T")[1].split(".")[0]} - {data.Topic3}
                  </Text>
                </ListContainer>
              </>
            ))}
          </TextBox>
          <Text size={"30px"}>Sentiment</Text>
          <BarGraph>
            <Sentiment />
          </BarGraph>
          {/* <Link to="/sentiment">
            <Button >more details</Button>
          </Link>   */}
        </TextContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  margin: 0;
  // margin-top: 40px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
const BarContainer = styled.div`
  height: 100%;
  min-width: 45%;
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
  min-width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
`;

const TextBox = styled.div`
  height: 210px;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  border-radius: 10px;
  margin: 66px 0 20px; 
  @media screen and (min-width: 720px) {
    height: 50%;
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

const SideBar = styled.div`
  background: #0d1f2d;
  text-align: center;
  min-height: 100vh;
  color: white;
  @media screen and (min-width: 720px) {

    margin-left: 0px;
    width: 10%;
    font-size: 12px;
    // margin-top:10px
  }
  @media (max-width: 720px) {
    height: 15vh;
    width: 100%;
    font-size: 15px;
  }
`;
const NavBar = styled.div`
  background: #f0f0f5;
  width: 100%;
  height: 30px;
  text-align: centre;
  font-size: light;
  padding: 5px 0;
`;

export default Home;
