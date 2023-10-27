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
import { parse } from "url";

const episodesMock = APIResponseMock.data;

test("Next Episode", () => {
  expect(getNextEpisodeNumber(episodesMock)).toBe(267);
  expect(getNextEpisodeNumber(TerribleAPIResponseMock)).toBe(266);
});

test("Total duration", () => {
  expect(getTotalDuration(episodesMock)).toBe(153949);
});

test("Shortest Episode", () => {
  expect(getShortestEpisodeNumber(episodesMock)).toBe(240);
});

const HOUR_IN_SECONDS = 60 * 60;
test("Titles < 2 hours", () => {
  const titlesBelow2H: Array<string> = getTitlesBelow2Hours(episodesMock);
  expect(titlesBelow2H.length).toBeGreaterThan(0);
  const totalDuration = episodesMock
    .filter((e) => titlesBelow2H.includes(e.title))
    .reduce((prev, curr, currIdx) => prev + parseInt(curr.duration), 0);
  expect(totalDuration).toBeLessThan(2 * HOUR_IN_SECONDS);
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
  expect(parseEpisode(input).number).toBe(input.number.toString());
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
  expect(parseEpisode(input).number).toBe(input.number);
});
