import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import Emotion from "../components/Emotion";
import TimeGraph from "../components/TimeGraph";
import Sentiment from "../components/SentimentComp";
import DateTime from "../components/DateTime";
import { Custom } from "../components/Interface";
import { useState, useEffect } from "react";
import { GetTextData, GetImageData, GetMeetInfo } from "../api/backend";
import axios from "axios";

function Home() {
  const [textData, setTextData] = useState([]);
  const [graphdata, setGraphData] = useState<any>();
  const [currentMood, setCurrentMood] = useState<String>();
  const [info, setInfo] = useState<any>();
  const [imgUrl, setImgUrl] = useState<any>();
  useEffect(() => {
    GetTextData().then((e) => {
      setTextData(e);
    });
    GetImageData().then((e) => {
      setGraphData(e);
    });
    GetMeetInfo().then((e) => {
      setInfo(e);
    });
    GetImageData().then((e) => {
      setImgUrl(e);
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
    setInterval(() => {
      const request1 = axios.post("http://43.204.11.138:3001/sentiment", {});
    }, 10000);
  }, []);

  return (
    <>
      <MainContainer>
        <SideBar>
          <Title1>BI Dashboard</Title1>
          <UserImg>
            <img
              src={"data:image/jpeg;base64," + imgUrl?.ImageURL}
              width="100px"
              height="110px"
              alt="UserPhoto"
            />
          </UserImg>

          <ParticipantListCont>
            <Text style={{ textAlign: "left" }} size="20px">
              Participants List:
            </Text>
            {info?.Participants.map((data: any, index: any) => (
              <>
                <Text
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    background: "#313638",
                    border: "1px solid black",
                    borderRadius: "5px"
                  }}
                  size="16px"
                  key={index}
                >
                  {data}
                </Text>
              </>
            ))}
            <Text style={{ textAlign: "left" }} size="18px">Meet ID:  {info?.Link}</Text>
            <Text style={{ textAlign: "center" }} size="14px">Click the below button to join the current google meet.</Text>
            <Link to={{ pathname: "https://meet.google.com/"+info?.Link}} target="_blank">
              <Button>Join Now</Button>
            </Link>
          </ParticipantListCont>

          <DateInfo>
            <DateTime></DateTime>
          </DateInfo>
        </SideBar>

        <BarContainer>
          <BarContainerHead>
            <Text size={"30px"}>Emotions</Text>
            <InfoContainer>
              <Text size={"20px"}> Current Emotion : </Text>
              <Text>{currentMood?.toUpperCase()}</Text>
              <Text>{}</Text>
            </InfoContainer>
          </BarContainerHead>
          <BarGraph>
            <Emotion />
          </BarGraph>
          <Text size={"30px"}>Emotions in Time Series</Text>
          <LineGraph>
            <TimeGraph />
          </LineGraph>
        </BarContainer>

        <TextContainer>
          <Text
            style={{ marginBottom: "10px", marginTop: "35px" }}
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
  min-width: 40%;
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
  min-width: 40%;
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
    max-height: 50%;
  }
`;

const ListContainer = styled.div`
  height: 50px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f5;
  margin-top: 15px;
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
  background-color: white;
  color: black;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px 0px;
  cursor: pointer;
  // align-itemm: left;
  @media (max-width: 720px) {
    display: none;
  }
`;

const SideBar = styled.div`
  background: #0d1f2d;
  text-align: center;
  display: flex;
  color: white;
  padding: 10px;

  @media screen and (min-width: 721px) {
    flex-direction: column;
    // justify-content:flex-start;
    min-height: 100vh;
    margin-left: 0px;
    min-width: 15%;
    font-size: 12px;
  }
  @media (max-width: 720px) {
    flex-direction: row;
    width: 100%;
    font-size: 15px;
  }
`;
const Title1 = styled.h1`
  font-size: 30px;

  @media (max-width: 720px) {
    flex: 1;
    display: none;
  }
`;
const UserImg = styled.div`
  width: 100%;
  height: 120px;
  // background:#F2F4F3;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 2px solid black;
  flex: 1;
`;
const DateInfo = styled.h4`
  @media screen and (min-width: 721px) {
    text-align: center;
    padding: 10px;
    font-size: 15px;
  }
  @media (max-width: 720px) {
    flex: 1;
    text-align: right;
    padding-right: 20px;
    // justify-content:flex-end;
  }
`;

const ParticipantListCont = styled.div`
  // font-family:roboto;
  padding: 10px;
  flex: 2;
  width: 90%;
  // color:white;
  border-radius: 10px;
  border: 2px solid black;
  // background-color: #F2F4F3;
  // @media screen and (min-width: 720px) {
  //   max-height: 50%;
  // }
`;
export default Home;
