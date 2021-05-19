import apiInstance from "../api-instance";

const getMenuImage = async (imgUrl) => {
  try {
    const result = await apiInstance.get(`/menu-out-campus/menu/${imgUrl}`, { responseType: "arraybuffer" });
    const blob = new Blob([result.data], { type: result.headers["content-type"] });
    const image = URL.createObjectURL(blob);
    return image;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default getMenuImage;
