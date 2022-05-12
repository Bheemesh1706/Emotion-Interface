import axios from "axios";

export const GetImageData = async () =>{
    const response = await axios.get("http://localhost:3001/image-id");
    return response.data.data[0].Data[0];
}
export const GetTextData = async () =>{
    const response = await axios.get("http://localhost:3001/text-id");
    return response.data.data;
}