import { getBuildFor } from "lizzygram-common-data";
import { TagData } from "./../types";

/* export const tagsData = [
  { _id: "123wsdf347423", title: "на улице", name: "street" },
  { _id: "123wsdf343423", title: "улыбка", name: "smile" },
  { _id: "123wsdd343423", title: "дача", name: "dacha" },
  { _id: "123wsdfj43423", title: "на природе", name: "nature" },
  { _id: "123wsdf34df23", title: "дома", name: "home" },
  { _id: "12wwsdf343423", title: "с петами", name: "pets" },
]; */

/* export const tagsData = new Map([
  ["123wsdf347423", { title: "на улице", name: "street" }],
  ["123wsdf343423", { title: "улыбка", name: "smile" }],
  ["123wsdd343423", { title: "дача", name: "dacha" }],
  ["123wsdfj43423", { title: "на природе", name: "nature" }],
  ["123wsdf34df23", { title: "дома", name: "home" }],
  ["12wwsdf343423", { title: "с петами", name: "pets" }],
]); */

const pTagsData: TagData[] = [
  // genre
  {
    id: "123weqwe1",
    title: "документальная",
    name: "documentary",
    type: "genre",
  },
  { id: "123weqwe2", title: "бытовая", name: "domestic", type: "genre" },
  { id: "123weqwe3", title: "портрет", name: "portrait", type: "genre" },
  { id: "123weqwe4", title: "пейзаж", name: "landscape", type: "genre" },
  { id: "123weqwe5", title: "натюрморт", name: "still-life", type: "genre" },
  { id: "123weqwe6", title: "рисунок", name: "picture", type: "genre" },
  {
    id: "123weqwe7",
    title: "компьютерная графика",
    name: "computer-graphics",
    type: "genre",
  },
  { id: "123weqwe8", title: "фотка", name: "simple-photo", type: "genre" },
  // details
  { id: "123weqwe9", title: "животные", name: "animals", type: "details" },
  { id: "123weqweq", title: "семья", name: "family", type: "details" },
  { id: "123weqwew", title: "природа", name: "nature", type: "details" },
  { id: "123weqwee", title: "город", name: "city", type: "details" },
  { id: "123weqwer", title: "актриса", name: "actress", type: "details" },
  { id: "123weqwet", title: "космос", name: "cosmos", type: "details" },
];

const lTagsData: TagData[] = [
  {
    id: "bCcRcxADj2xP9fkSXNpH",
    title: "зюганов",
    name: "zuganov",
    type: "feeling",
  },

  {
    id: "vekwWqVY1yYRd3XeERmd",
    name: "pets",
    title: "с животными",
    type: "withWho",
  },

  {
    id: "vekwWqVY1yYRd3XeER12",
    name: "parents",
    title: "с родителями",
    type: "withWho",
  },

  {
    id: "vekwWqVY1222d3XeERmd",
    name: "grandmother",
    title: "с бабушкой",
    type: "withWho",
  },
  {
    id: "vekwWqVY1222eeXeERmd",
    name: "man",
    title: "с дядей",
    type: "withWho",
  },

  {
    id: "rNNyXhgNJUjsbGFzVGAL",
    title: "на улице",
    name: "street",
    type: "where",
  },

  {
    id: "WX6CY5kGx4FXvdZR6g8E",
    name: "smile",
    title: "улыбка",
    type: "feeling",
  },

  {
    id: "ieYx4ke8ms0DJb5APv4u",
    title: "задумчиво",
    name: "thoughtfully",
    type: "feeling",
  },

  { id: "ybrq9aFZlTk71akoH7Lz", title: "дома", name: "home", type: "where" },

  {
    id: "fYZ3uqG1vBLFH75Y0rjM",
    title: "на природе",
    name: "nature",
    type: "where",
  },
];

const pTagsState = {
  "123weqwe1": false,
  "123weqwe2": false,
  "123weqwe3": false,
  "123weqwe4": false,
  "123weqwe5": false,
  "123weqwe6": false,
  "123weqwe7": false,
  "123weqwe8": false,
  // details
  "123weqwe9": false,
  "123weqweq": false,
  "123weqwew": false,
  "123weqwee": false,
  "123weqwer": false,
  "123weqwet": false,
};

const pDefaultTags = {
  "123weqwee": true,
  "123weqwe3": true,
  "123weqweq": true,
};

const lTagsState = {
  bCcRcxADj2xP9fkSXNpH: false,
  vekwWqVY1yYRd3XeERmd: false,
  rNNyXhgNJUjsbGFzVGAL: false,
  WX6CY5kGx4FXvdZR6g8E: false,
  ieYx4ke8ms0DJb5APv4u: false,
  ybrq9aFZlTk71akoH7Lz: false,
  fYZ3uqG1vBLFH75Y0rjM: false,
  vekwWqVY1yYRd3XeER12: false,
  vekwWqVY1222d3XeERmd: false,
  vekwWqVY1222eeXeERmd: false,
};

const lDefaultTags = {
  rNNyXhgNJUjsbGFzVGAL: true,
  ieYx4ke8ms0DJb5APv4u: true,
  fYZ3uqG1vBLFH75Y0rjM: true,
};

export const tagsData = getBuildFor() === "portfolio" ? pTagsData : lTagsData;

export const state = getBuildFor() === "portfolio" ? pTagsState : lTagsState;

export const defaultTags =
  getBuildFor() === "portfolio" ? pDefaultTags : lDefaultTags;
