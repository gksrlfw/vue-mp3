<template>
  <div class="container mx-auto">
    <form class="flex flex-col justify-center items-center ">
      <input
        type="text"
        class="text-gray-600 w-1/2 h-16 text-center mb-4 rounded-lg shadow-lg text-lg font-bold p-2 border-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-50"
        placeholder="URL"
        v-model="data.videoUrl"
      />
      <input
        type="text"
        class="w-1/2 h-16 text-center mb-4 rounded-lg shadow-lg text-lg font-bold p-2 border-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-50"
        placeholder="TITLE"
        v-model="data.title"
      />
      <input
        type="text"
        class="w-1/2 h-16 text-center mb-4 rounded-lg shadow-lg text-lg font-bold p-2 border-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-50"
        placeholder="ARTIST"
        v-model="data.artist"
      />
      <input
        type="text"
        class="w-1/2 h-16 text-center mb-4 rounded-lg shadow-lg text-lg font-bold p-2 border-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-50"
        placeholder="ALBUM"
        v-model="data.album"
      />
      <input
        type="text"
        class="w-1/2 h-16 text-center mb-4 rounded-lg shadow-lg text-lg font-bold p-2 border-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-50"
        placeholder="GENRE"
        v-model="data.genre"
      />
      <input
        type="text"
        class="w-1/2 h-16 text-center mb-4 rounded-lg shadow-lg text-lg font-bold p-2 border-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-50"
        placeholder="IMAGE URL"
        v-model="data.imageUrl"
      />
      <textarea
        class="w-1/2 h-32 text-center mb-4 rounded-lg shadow-lg text-lg font-bold p-2 border-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-50"
        placeholder="LYRICS"
        v-model="data.lyrics"
      />
      <svg
        class="animate-spin h-5 w-5 mr-3 bg-gray-700"
        viewBox="0 0 24 24"
        v-if="isRunning"
      >
        LOADING
      </svg>
      <div class="w-1/2 flex flex-row justify-between mb-4">
        <button
          class="bg-gray-400 py-3 px-4 rounded-md font-semibold text-gray-800 border-2 border-gray-400 hover:bg-gray-500 focus:outline-none shadow-md"
          @click.prevent="search"
        >
          SEARCH
        </button>
        <button
          class="bg-gray-400 py-2 px-3 rounded-md font-semibold text-gray-800 border-2 border-gray-400 hover:bg-gray-500 focus:outline-none shadow-md"
          @submit.prevent="convert"
          @click.prevent="convert"
        >
          CONVERT
        </button>
      </div>
      <!-- <textarea
        ref="result"
        class="w-1/2 h-32 text-center mb-4 rounded-lg shadow-lg text-lg font-bold p-2 border-2 focus:outline-none focus:bg-gray-100 hover:bg-gray-50"
        v-model="processing"
      /> -->
    </form>
  </div>
</template>

<script lang="">
import { defineComponent, ref, watch } from "vue";
import {
  data,
  search,
  convert,
  processing,
  isRunning
} from "@/views/Downloader/logic";

export default defineComponent({
  setup() {
    const result = ref("");
    // watch(
    //   () => processing.value,
    //   () => {
    //     result.value.scrollTo(0, result.value.scrollHeight);
    //   }
    // );
    return {
      data,
      search,
      convert,
      processing,
      result,
      isRunning
    };
  }
});
</script>
