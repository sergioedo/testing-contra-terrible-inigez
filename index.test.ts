import { expect, test } from "bun:test";
import APIResponseMock from "./api-response-mock.json";
import {
  getNextEpisodeNumber,
  getTotalDuration,
  getShortestEpisodeNumber,
  getTitlesBelow2Hours,
} from "./index";

const episodesMock = APIResponseMock.data;

test("Next Episode", () => {
  expect(getNextEpisodeNumber(episodesMock)).toBe(267);
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
