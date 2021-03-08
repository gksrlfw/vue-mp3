import axios from "axios";
import { reactive, ref } from "vue";
import { BASE_URL } from "../store/GlobalVariable";

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
  videoUrl: "",
  title: "",
  artist: "",
  album: "",
  genre: "",
  imageUrl: "",
  lyrics: ""
});

export const processing = ref("");
export const isRunning = ref("");
export async function search() {
  try {
    console.log("search...");
    const response = await axios.get(`${BASE_URL}/main`);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export async function convert() {
  try {
    if (isRunning.value) return alert("Running! Plz try it after this running");
    console.log("convert...");
    isRunning.value = true;
    processing.value = "";
    const es = new EventSource(`/sse`);
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
    const response = await axios.post(`${BASE_URL}/convert/youtube`, data);
    window.open(`${BASE_URL}/download/${response.data.audioPath}`);
    isRunning.value = false;
  } catch (err) {
    console.error(err);
    isRunning.value = false;
  }
}
