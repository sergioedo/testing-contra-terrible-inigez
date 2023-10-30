import { expect, test } from "bun:test";
import APIResponseMock from "./api-response-mock.json";
import TerribleAPIResponseMock from "./terrible-api-response-mock.json";
import {
  getNextEpisodeNumber,
  getTotalDuration,
  getShortestEpisodeNumber,
  getTitlesBelow2Hours,
  parseEpisode,
  ITerribleEpisode,
} from "./index";

const episodesMock = APIResponseMock.data.map(parseEpisode);
const terribleEpisodesMock = TerribleAPIResponseMock.data.map(parseEpisode);

test("Next Episode", () => {
  expect(getNextEpisodeNumber(episodesMock)).toBe(267);
  expect(getNextEpisodeNumber(terribleEpisodesMock)).toBe(263);
});

test("Total duration", () => {
  expect(getTotalDuration(episodesMock)).toBe(153949);
  expect(getTotalDuration(terribleEpisodesMock)).toBe(3578);
});

test("Shortest Episode", () => {
  expect(getShortestEpisodeNumber(episodesMock)).toBe(240);
  expect(getShortestEpisodeNumber(terribleEpisodesMock)).toBe(262);
});

const HOUR_IN_SECONDS = 60 * 60;
test("Titles < 2 hours", () => {
  const titlesBelow2H: Array<string> = getTitlesBelow2Hours(episodesMock);
  expect(titlesBelow2H.length).toBeGreaterThan(0);
  const totalDuration = episodesMock
    .filter((e) => titlesBelow2H.includes(e.title))
    .reduce((prev, curr, currIdx) => prev + curr.duration, 0);
  expect(totalDuration).toBeLessThan(2 * HOUR_IN_SECONDS);

  const terribleTitlesBelow2H: Array<string> =
    getTitlesBelow2Hours(terribleEpisodesMock);
  expect(terribleTitlesBelow2H.length).toBeGreaterThan(0);
  const totalDurationTerrible = terribleEpisodesMock
    .filter((e) => terribleTitlesBelow2H.includes(e.title))
    .reduce((prev, curr, currIdx) => prev + curr.duration, 0);
  expect(totalDurationTerrible).toBeLessThan(2 * HOUR_IN_SECONDS);
});

test("Parse episode with number as number", () => {
  const input: ITerribleEpisode = {
    number: 265,
    duration: "333",
    title:
      "WRP 265. Una casualidad y un colega te cambian la vida profesional para siempre con Miguel Barahona",
    excerpt: "De programador desfasado a programador actualizado y satisfecho.",
    published_at: 1695771354,
    id: "0497df80970acdd20bdd802251b7fa02",
  };
  expect(parseEpisode(input).number).toBe(input.number);
});

test("Parse episode with number as string", () => {
  const input: ITerribleEpisode = {
    number: "265",
    duration: "333",
    title:
      "WRP 265. Una casualidad y un colega te cambian la vida profesional para siempre con Miguel Barahona",
    excerpt: "De programador desfasado a programador actualizado y satisfecho.",
    published_at: 1695771354,
    id: "0497df80970acdd20bdd802251b7fa02",
  };
  expect(parseEpisode(input).number).toBe(265);
});

test("Parse episode without number", () => {
  const input: ITerribleEpisode = {
    duration: "333",
    title:
      "WRP 265. Una casualidad y un colega te cambian la vida profesional para siempre con Miguel Barahona",
    excerpt: "De programador desfasado a programador actualizado y satisfecho.",
    published_at: 1695771354,
    id: "0497df80970acdd20bdd802251b7fa02",
  };
  expect(parseEpisode(input).valid).toBe(false);
});

test("Parse episode without duration", () => {
  const input: ITerribleEpisode = {
    number: "265",
    title:
      "WRP 265. Una casualidad y un colega te cambian la vida profesional para siempre con Miguel Barahona",
    excerpt: "De programador desfasado a programador actualizado y satisfecho.",
    published_at: 1695771354,
    id: "0497df80970acdd20bdd802251b7fa02",
  };
  expect(parseEpisode(input).valid).toBe(false);
});

test("Parse episode with duration", () => {
  const input: ITerribleEpisode = {
    number: "265",
    duration: "666",
    title:
      "WRP 265. Una casualidad y un colega te cambian la vida profesional para siempre con Miguel Barahona",
    excerpt: "De programador desfasado a programador actualizado y satisfecho.",
    published_at: 1695771354,
    id: "0497df80970acdd20bdd802251b7fa02",
  };
  expect(parseEpisode(input).valid).toBe(true);
});

test("Parse episode without title", () => {
  const input: ITerribleEpisode = {
    number: "265",
    duration: "666",
    excerpt: "De programador desfasado a programador actualizado y satisfecho.",
    published_at: 1695771354,
    id: "0497df80970acdd20bdd802251b7fa02",
  };
  expect(parseEpisode(input).valid).toBe(false);
});

test("Parse episode with title", () => {
  const input: ITerribleEpisode = {
    number: "265",
    duration: "666",
    title:
      "WRP 265. Una casualidad y un colega te cambian la vida profesional para siempre con Miguel Barahona",
    excerpt: "De programador desfasado a programador actualizado y satisfecho.",
    published_at: 1695771354,
    id: "0497df80970acdd20bdd802251b7fa02",
  };
  expect(parseEpisode(input).valid).toBe(true);
});
