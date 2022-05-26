import {NavLink as Link} from "react-router-dom";
import styled from "styled-components";


export default function EmotionDetails() {
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

  return (
    <>
        <p>Emotion Details Page </p>
        <Link to="/">
          <Button>
            Back
          </Button>
        </Link>
    </>
    
  )
}
