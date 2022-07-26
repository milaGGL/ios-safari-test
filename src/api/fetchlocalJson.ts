import axios from "axios";
import { sleep } from "./helpers";


const SLEEP_BETWEEN_PAGES = 5;

const urls = {
  "50":"./50data.json",
  "100":"./100data.json",
  "1000":"./1000data.json",
  "2000":"./2000data.json",
  "5000":"./5000data.json",

}
export const onFetchLocalJson = async (
  maxCount: number,
  onLoadingPage: (count: number) => void
) => {
    console.log("loading page");
   
    await sleep(SLEEP_BETWEEN_PAGES);

    const res = await axios.get(`./${maxCount}data.json`)
    const docs = await res.data;
    
    onLoadingPage(maxCount)
    console.log("all pages are loaded");

  return null;
};
