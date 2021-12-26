import { getAll } from "../repository/firestore";
//import { getAll } from "../repository/firestore.fake";

export const getTags = () => getAll();

/* class TagsService {
  repository: TagsRepository;

  constructor(repository: TagsRepository) {
    this.repository = repository;
  }

  getTags = () => this.repository.getAll();
}

export default TagsService; */
