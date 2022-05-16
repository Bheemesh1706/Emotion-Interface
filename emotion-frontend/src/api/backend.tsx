import axios from "axios";

export const GetImageData = async () =>{
    const response = await axios.get("http://43.204.11.138:3001/image-id")
    return response.data.data[0];
}
export const GetTextData = async () =>{
    const response = await axios.get("http://43.204.11.138:3001/text-id");
    return response.data.data;
}