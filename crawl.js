import axios from "axios";
import cheerio from "cheerio";

const restaurantCodes = {
  north: "fclt",
  west: "west",
  east: "east1",
  eastFacaulty: "east2",
  facaultyHall: "emp",
  moonji: "icc",
  hwaAm: "hawam",
  seoul: "seoul",
};

const getUrl = (restaurantCode, date) => {
  const prefix = "https://kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=";
  const datePrefix = "&stt_dt=";
  return `${prefix}${restaurantCode}${datePrefix}${date}`;
};

const getFormattedDate = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0];
};

const MAX_CRAWL_DAY = 7;
const today = new Date();
const weekDateList = new Array(MAX_CRAWL_DAY).fill(today);
const formattedDateList = weekDateList.reduce((acc, date, idx) => {
  const currentDate = new Date(date);
  currentDate.setDate(date.getDate() + idx);

  const formattedDate = getFormattedDate(currentDate);
  acc.push(formattedDate);
  return acc;
}, []);

const crawlEachRestaurantOneDay = async (restaurant, date) => {
  try {
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    };
    const html = await axios.get(getUrl(restaurantCodes[restaurant], date), { headers });
    const $ = cheerio.load(html.data);
    const meals = $("#tab_item_1 tbody").find("td");
    const parseMeals = {};
    meals.each(function (idx, _) {
      const text = $(this).children("ul").text();
      text.replace(/\t/g, "");
      const menus = text
        .replace(/\t/g, "")
        .split("\n")
        .filter((el) => el.length);
      parseMeals[idx] = menus;
    });
    return parseMeals;
  } catch (e) {
    console.error(e);
  }
};

const crawlEachRestaurant = async (restaurant) => {
  const restaurantResult = {};
  for (let i = 0; i < formattedDateList.length; i++) {
    const oneDayResult = await crawlEachRestaurantOneDay(restaurant, formattedDateList[i]);
    if (Object.values(oneDayResult).every((el) => !el.length)) return restaurantResult;
    restaurantResult[formattedDateList[i]] = oneDayResult;
  }
  return restaurantResult;
};

const main = async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const crawlData = {};
  for (let [key, val] of Object.entries(restaurantCodes)) {
    const restaurantCrawl = await crawlEachRestaurant(key);
    crawlData[key] = restaurantCrawl;
  }
};

main();