import axios from "axios";
import { reactive, ref } from "vue";

// export const data = reactive({
//   videoUrl: "https://www.youtube.com/watch?v=voES-Cqee2A",
//   title: "MORNING BREEZE",
//   artist: "JUKE ROSS",
//   album: "GREY",
//   genre: "POP",
//   imageUrl:
//     "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA3MTZfMjI4%2FMDAxNTYzMjA3MTY3OTk1.T7hKSppX9kGIBWtCwUsVhRi-SKIlh9Jglopy1eHItNMg.omm5Gke6M8uYs1l5hawDpGnFuJQDdRQnsL10nEZcbGcg.JPEG.jooinassiya%2F809a3ab99f96e6d532d5ee0d5b4ba58a.500x500x1.jpg&type=sc960_832",
//   lyrics: "Don't even try"
// });

export const data = reactive({
  // videoUrl: "https://www.youtube.com/watch?v=voES-Cqee2A",
  videoUrl: "",
  title: "",
  artist: "",
  // title: "morning breeze",
  // artist: "juke ross",
  album: "",
  genre: "",
  imageUrl: "",
  lyrics: ""
});

export const processing = ref("");
export const isRunning = ref("");
export async function search() {
  try {
    if(isRunning.value) return alert("Already running! Plz try it after this running");
    isRunning.value = true;
    console.log("search...");
    const response = await axios.post(`/api/convert/scrap`, data);
    console.log(response.message);
    if(response?.data?.message) {
      isRunning.value = false;
      return alert(response.data.message);
    }
    // data에 response.data 넣기
    data.videoUrl = response.data.V_URL;
    data.title = response.data.TITLE;
    data.artist = response.data.ARTIST;
    data.album = response.data.ALBUM;
    data.genre = response.data.GENRE;
    data.imageUrl = response.data.IMG_URL;
    data.lyrics = response.data.LYRICS;
    console.log(response, data, response.data);
    isRunning.value = false;
  } catch (err) {
    console.error(err);
    isRunning.value = false;
    return alert('Error: Failed to search');
  }
}

export async function convert() {
  try {
    if (isRunning.value) return alert("Already running! Plz try it after this running");
    console.log("convert...");
    isRunning.value = true;
    processing.value = "";

    // ecs에 배포하면 proxy가 안먹는다... 왜지...
    const es = new EventSource(`/sse`, { withCredentials: true });
    es.onmessage = e => {
      if (e.data === "COMPLETED!") {
        es.close();
        processing.value += `=== COMPLETED! ===
        `;
      } else if (!e.data) return;
      else {
        processing.value += `${e.data}kb downloaded!
        `;
      }
    };

    processing.value += `=== ${data.title} ===
    `;
    const response = await axios.post(`/api/convert/youtube`, data);
    window.open(`/api/download/${response.data.audioPath}`);
    isRunning.value = false;
  } catch (err) {
    console.error(err);
    isRunning.value = false;
    return alert('Error: Failed to convert');
  }
}
