import axios from "axios";

export const GetImageData = async () =>{
    const response = await axios.get("http://43.204.11.138:3001/image-id")
    console.log (response.data.data[0]);
    return response.data.data[0];
}
export const GetTextData = async () =>{
    const response = await axios.get("http://43.204.11.138:3001/text-id");
    console.log (response.data.data);
    return response.data.data;
}

export const  Scrapetext =async () => {
    const response  = await axios.post("http://43.204.11.138:3001/text",{
        headers: {
            'Access-Control-Allow-Origin':"*"
        }
    });
}

export const GetAllImageData = async () =>{
    const response = await axios.get("http://43.204.11.138:3500/imagedata");
    console.log(response.data.data);
    return response.data.data;
}

export const GetSentimentData = async () =>{
    const response = await axios.get("http://43.204.11.138:3001/Sentiment-id");
    console.log(response.data.data);
    return response.data.data;
}