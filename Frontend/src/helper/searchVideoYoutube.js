const axios = require("axios");
const url = "https://www.googleapis.com/youtube/v3/search";

export async function searchVideoYoutube(keySearch) {
  try {
    const response = await axios.get(url, {
      params: {
        part: "snippet,id",
        q: keySearch,
        maxResults: 50,
        type: "video",
        key: "",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
