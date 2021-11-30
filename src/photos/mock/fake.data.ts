import { FirestoreDate, Photo } from "./../types";
//@ts-ignore
import image1 from "./../../images/12.jpg";
//@ts-ignore
import image2 from "./../../images/13.jpg";
//@ts-ignore
import image3 from "./../../images/freestocks-9U.jpg";
//@ts-ignore
import image4 from "./../../images/image0.jpeg";
//@ts-ignore
import image5 from "./../../images/image7.jpeg";
//@ts-ignore
import image6 from "./../../images/peizaj4.jpg";
//@ts-ignore
import image7 from "./../../images/peizaj.jpg";
//@ts-ignore
import image8 from "./../../images/ladki.jpg";
//@ts-ignore
import image9 from "./../../images/image2.jpeg";
//@ts-ignore
import image10 from "./../../images/peizaj3.png";

//import { TPhotosData } from "../types";

//const pathToStaticImagesDir = `file:///home/nikki/Documents/Project/lizzygram/gatsby/static/images`;

export const addedPhoto: Photo<FirestoreDate> = {
  id: "bla",
  _timestamp: new Date(2019, 11, 25),
  files: ["hello123.jpb"],
  base64:
    "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA8DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQMG/8QAJhAAAQIDBgcAAAAAAAAAAAAAAgABAwQFBgcREnOxExUhNDVBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGREAAgMBAAAAAAAAAAAAAAAAAQIAAyEE/9oADAMBAAIRAxEAPwDaWuq7UemcQMCiP1ye3ZE2Lq3OJKJHIWFnLFh+I+8jvpXTPZTuu8IeoW6IYm6WWVqnMpA07P/Z",
  aspectRatio: 1.3,
  src: image1,
  iconSrc: image1,
  srcSet: image1,
  date: {
    toDate: () => new Date(2018, 11, 17),
  } as any,
  description: "We are going home...",
  tags: { ieYx4ke8ms0DJb5APv4u: true, vekwWqVY1222eeXeERmd: true },
  yearsOld: 0,
  googleDriveId: "",
  addedByUserUID: "userUID",
  isActive: true,
  imageExtention: "jpeg",
};

export const photos: Photo<FirestoreDate>[] = [
  {
    id: "112",
    _timestamp: new Date(2018, 11, 23),
    files: ["hello.jpb"],
    base64:
      "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAVAA8DASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGBP/EACQQAAEDAwQBBQAAAAAAAAAAAAECAwQABREGEyExQSIyYXHR/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABsRAAEFAQEAAAAAAAAAAAAAAAEAAgMREiET/9oADAMBAAIRAxEAPwCR0xDVqCU21MK2UYz19/lPVanj6dL1unSXWG2leh5ocn4NbZ7L0N6Eq3gIDfCseaVSbM3OnSXpyd7eIOFeKOwPI3SQ7zDc31UG7lBcKQSB1S2wvKuN0kF/2tjCUjqiinScZYRoRqQAr//Z",
    aspectRatio: 0.71,
    src: image2,
    iconSrc: image2,
    srcSet: image2,
    date: {
      toDate: () => new Date(2018, 11, 17),
    } as any,
    description: "",
    tags: { bCcRcxADj2xP9fkSXNpH: true, vekwWqVY1222d3XeERmd: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "userUID2",
    isActive: true,
    imageExtention: "jpeg",
  },
  {
    id: "232",
    _timestamp: new Date(2018, 10, 28),
    files: ["hell.jpj"],
    base64:
      "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAA8DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMG/8QAJRAAAQIFBAEFAAAAAAAAAAAAAQIFAAMGEiEEBxETFDFhcYHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAYEQEAAwEAAAAAAAAAAAAAAAABAAIRIf/aAAwDAQACEQMRAD8Ae7UMii29XiOakieeOtAyfiBaOh3eotP2aR4tTLxav1+42e5xJdGkE4tP7ENmlKVNeriTxMxyfeKPHYqDVJ//2Q==",
    aspectRatio: 1.5,
    /* src: `${pathToStaticImagesDir}/image7.jpeg`,
    iconSrc: `${pathToStaticImagesDir}/image7.jpeg`,
    srcSet: `${pathToStaticImagesDir}/image7.jpeg`, */
    src: image3,
    iconSrc: image3,
    srcSet: image3,
    date: {
      toDate: () => new Date(2018, 10, 23),
    } as any,
    description: "Hello, from desc",
    tags: { WX6CY5kGx4FXvdZR6g8E: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "user12",
    isActive: true,
    imageExtention: "jpeg",
  },

  {
    id: "234234",
    _timestamp: new Date(2019, 9, 25),
    files: ["h.png"],
    base64:
      "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPAAsDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgAH/8QAIBAAAQMEAgMAAAAAAAAAAAAAAQIEEQADBhIFQSEjcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAYEQEAAwEAAAAAAAAAAAAAAAABAAIREv/aAAwDAQACEQMRAD8ARLzJDJbZtuEbmIpAMmugQiCnrzWF848Nx7aWAPX3UMgcgQFqj7Raka/CGE//2Q==",
    aspectRatio: 0.75,
    src: image4,
    iconSrc: image4,
    srcSet: image4,
    date: {
      toDate: () => new Date(2019, 9, 23),
    } as any,
    description: "",
    tags: { vekwWqVY1222eeXeERmd: true },
    yearsOld: 1,
    googleDriveId: "",
    addedByUserUID: "userUID",
    isActive: true,
    imageExtention: "jpeg",
  },

  {
    id: "323445345",
    _timestamp: new Date(2019, 9, 25),
    files: ["h.png"],
    base64:
      "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPAAsDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgQH/8QAHxAAAQQCAgMAAAAAAAAAAAAAAQIDBBEABRMiITVh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAbEQACAgMBAAAAAAAAAAAAAAABAgMRACFBgf/aAAwDAQACEQMRAD8AFsaiVopy25gSbBPXzhOfI3Dk15YUQCo0M0Hd+xrlUpd9iclMRskkgWfmEsQsnKHlBiVBer7rzP/Z",
    aspectRatio: 0.75,
    src: image5,
    iconSrc: image5,
    srcSet: image5,
    date: {
      toDate: () => new Date(2019, 9, 23),
    } as any,
    description: "We're start playing video games...",
    tags: { bCcRcxADj2xP9fkSXNpH: true },
    yearsOld: 1,
    googleDriveId: "",
    addedByUserUID: "userUID",
    isActive: true,
    imageExtention: "jpeg",
  },

  {
    id: "3309",
    _timestamp: new Date(2018, 9, 28),
    files: ["helloo.jpj"],
    base64:
      "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAA8DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhAAAgMAAQUAAAAAAAAAAAAAAQIAAwQGBxESFEH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABoRAAICAwAAAAAAAAAAAAAAAAACAQMRFCH/2gAMAwEAAhEDEQA/AM9w7NVo2qLqVs8SCO8qdSL3fevtZalFShVCn5ERb2nbWC5OVZP/2Q==",
    aspectRatio: 2.12,
    /* src: `${pathToStaticImagesDir}/image7.jpeg`,
    iconSrc: `${pathToStaticImagesDir}/image7.jpeg`,
    srcSet: `${pathToStaticImagesDir}/image7.jpeg`, */
    src: image6,
    iconSrc: image6,
    srcSet: image6,
    date: {
      toDate: () => new Date(2018, 10, 23),
    } as any,
    description: "Breeyt street2.jpg",
    tags: { saDWGntDo84EQYG8FGFE: true, ybrq9aFZlTk71akoH7Lz: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "userUID2",
    isActive: true,
    imageExtention: "jpeg",
  },

  {
    id: "332399",
    _timestamp: new Date(2019, 2, 8),
    files: ["helloo.jpj"],
    base64:
      "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAA8DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAQMDBQAAAAAAAAAAAAAAAgABAwQFBhITITFR/8QAFAEBAAAAAAAAAAAAAAAAAAAABv/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMEITH/2gAMAwEAAhEDEQA/AM9xrE5KsXaUWeEuy8UG92yioZZB3WkET08IiTltchbHvey0qTP/2Q==",
    aspectRatio: 1.78,
    /* src: `${pathToStaticImagesDir}/image7.jpeg`,
    iconSrc: `${pathToStaticImagesDir}/image7.jpeg`,
    srcSet: `${pathToStaticImagesDir}/image7.jpeg`, */
    src: image7,
    iconSrc: image7,
    srcSet: image7,
    date: {
      toDate: () => new Date(2019, 2, 8),
    } as any,
    description: "Breeyt street2.jpg",
    tags: { rNNyXhgNJUjsbGFzVGAL: true, ybrq9aFZlTk71akoH7Lz: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "userUID2",
    isActive: true,
    imageExtention: "jpeg",
  },

  {
    id: "334477",
    _timestamp: new Date(2018, 8, 8),
    files: ["helloo.jpj"],
    base64:
      "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAJAA8DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAACAYH/8QAIhAAAQMDAwUAAAAAAAAAAAAAAQIDBAAGBxEhcgUSFDU2/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AK1g5b8YreeiJSBqTvrWdTr9uKPcUgudRSxPSOxayDuKT7/q3uFCTJn2U/lQf//Z",
    aspectRatio: 1.6,
    /* src: `${pathToStaticImagesDir}/image7.jpeg`,
    iconSrc: `${pathToStaticImagesDir}/image7.jpeg`,
    srcSet: `${pathToStaticImagesDir}/image7.jpeg`, */
    src: image8,
    iconSrc: image8,
    srcSet: image8,
    date: {
      toDate: () => new Date(2018, 8, 8),
    } as any,
    description: "Breeyt street2.jpg",
    tags: { vekwWqVY1222d3XeERmd: true, ybrq9aFZlTk71akoH7Lz: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "userUID",
    isActive: true,
    imageExtention: "jpeg",
  },

  {
    id: "33669",
    _timestamp: new Date(2019, 11, 25),
    files: ["helloo.jpj"],
    base64:
      "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPAAsDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgf/xAAhEAABAwQBBQAAAAAAAAAAAAABAgMEAAURIQYSExQxMv/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGREBAAMBAQAAAAAAAAAAAAAAAQACESED/9oADAMBAAIRAxEAPwCfTlTrNZ4UwPBzyflJNEXuRkOq7sVkrzs0yTa3I9oYNzfMhJ1HbPoUQlqhCS4HISOrO8VPW6KBuRvSleJzZ//Z",
    aspectRatio: 0.75,
    /* src: `${pathToStaticImagesDir}/image7.jpeg`,
    iconSrc: `${pathToStaticImagesDir}/image7.jpeg`,
    srcSet: `${pathToStaticImagesDir}/image7.jpeg`, */
    src: image9,
    iconSrc: image9,
    srcSet: image9,
    date: {
      toDate: () => new Date(2019, 11, 25),
    } as any,
    description: "Breeyt street2.jpg",
    tags: { fYZ3uqG1vBLFH75Y0rjM: true, WX6CY5kGx4FXvdZR6g8E: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "userUID",
    isActive: true,
    imageExtention: "jpeg",
  },

  {
    id: "336691",
    _timestamp: new Date(2019, 9, 15),
    files: ["helloo.jpj"],
    base64: "",
    aspectRatio: 1.78,
    /* src: `${pathToStaticImagesDir}/image7.jpeg`,
    iconSrc: `${pathToStaticImagesDir}/image7.jpeg`,
    srcSet: `${pathToStaticImagesDir}/image7.jpeg`, */
    src: image10,
    iconSrc: image10,
    srcSet: image10,
    date: {
      toDate: () => new Date(2019, 9, 15),
    } as any,
    description: "Breeyt street2.jpg",
    tags: { fYZ3uqG1vBLFH75Y0rjM: true, WX6CY5kGx4FXvdZR6g8E: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "userUID2",
    isActive: true,
    imageExtention: "png",
  },
];
