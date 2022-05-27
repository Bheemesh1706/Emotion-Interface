import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { GetImageData } from "../api/backend";
import React, { useEffect, useState } from "react";

export default function EmotionDetails() {
  const [imgUrl, setImgUrl] = useState<any>();

  useEffect(() => {
    GetImageData().then((e) => {
      setImgUrl(e);
    });
  });

  return (
    <MainContainer>
      
      <ImageElement>
        <h3 style={{textAlign:"center"}}>USER IMAGE</h3>
        <ImageContainer>
          <img src={"data:image/jpeg;base64," + imgUrl?.ImageURL} />
        </ImageContainer>
      </ImageElement>
      <Text>
        <h3>Happy: {imgUrl?.Happy}</h3>
        <h3>Sad: {imgUrl?.Sad}</h3>
        <h3>Angry: {imgUrl?.Angry}</h3>
        <h3>Disgust: {imgUrl?.Disgust}</h3>
        <h3>Surprise: {imgUrl?.Surprise}</h3>
        <h3>Neutral: {imgUrl?.Neutral}</h3>
        <h3>Fear: {imgUrl?.Fear}</h3>
        <h3>Time: {imgUrl?.createdAt}</h3>



      </Text>
      <Link to="/">
        <Button>Back</Button>
      </Link>
    </MainContainer>
  );
}

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 5px 0px;
  cursor: pointer;
  margin-left:60px
`;

const MainContainer = styled.div`
  margin: 0;
  margin-left:20px;
  // background: #fff;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  // display: flex;
`;
const ImageElement = styled.div`
  // background: #f0f0f5;
  height: 100%;
  width: 10%;
  padding: 10px 50px;
  margin: 20px 0;
  height: 50vh;
  display: flex;
  flex-direction:column;
  justify-content:center;
  border-radius: 25px;

`;
const ImageContainer = styled.section`
  // padding: 20px;
  // border: 1px solid black;
  display:flex;
  justify-content:center;
  `;
const Text = styled.section`
  display: flex-box;
  width:40%;
  background:#f0f0f5;
  padding: 10px 50px;
  border-radius:25px;
`;