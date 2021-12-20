import { TagData } from "../types";
import { tagsData } from "../mock/data";
import wait from "waait";

export const getAll = async () => {
  await wait(1000);

  return tagsData;
};

/* class TagsFakeRepository implements TagsRepository {
  getAll = async () => {
    await wait(1000);

    return tagsData;
  };
}

export default TagsFakeRepository; */
