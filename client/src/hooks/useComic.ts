import { getRequest, postRequest, putRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useComic = () => {
  const fetchComicBanner = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComicBanner`,
    });
    return res;
  };

  const getComicAlbum = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComicAlbum`,
    });
    return res;
  };

  const getComicAlbumContent = async (idList) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComicInAlbum?idList=${idList}&limit=20&page=1`,
    });
    return res;
  };

  const getComicAlbumContentAll = async (idList) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getComicInAlbum?idList=${idList}&limit=10000&page=1`,
    });
    return res;
  };

  const getRankingTable = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getRankingTable`,
    });
    return res;
  };

  const getReadingHistories = async (userId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getReadingHistories?userId=${userId}&limit=20&page=1`,
    });
    return res;
  };

  const getNewChapterComic = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/getNewChapterComic`,
    });
    return res;
  };

  const checkUserBanned = async (userId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/checkUserBanned?userId=${userId}`,
    });
    return res;
  };

  const checkValidCommentContent = async (content) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/checkValidCommentContent?content=${content}`,
    });
    return res;
  };

  const banUser = async (userId) => {
    const res = await putRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/comics/banUser`,
      isFormData: false,
      formData: {
        userId,
      },
    });
    return res;
  };

  const fetchAllEventsBySearch = async (page, props = {}) => {
    let endPointUrl = `/api/event?page=${page}&limit=12`;
    const appendParam = (param, value) => {
      if (value !== "" && typeof value !== "undefined") {
        endPointUrl += `&${param}=${value}`;
      }
    };
    Object.keys(props).forEach((prop) => {
      appendParam(prop, props[prop]);
    });
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };

  return {
    fetchComicBanner,
    getComicAlbum,
    getComicAlbumContent,
    getComicAlbumContentAll,
    getRankingTable,
    checkUserBanned,
    checkValidCommentContent,
    banUser,
    getReadingHistories,
    getNewChapterComic,

    fetchAllEventsBySearch,
  };
};
