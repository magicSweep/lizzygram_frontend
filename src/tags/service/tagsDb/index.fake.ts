import { TagData } from "../../types";
import { getTagsData } from "../../fake-data/data";
import wait from "waait";

const tagsData = getTagsData();

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
