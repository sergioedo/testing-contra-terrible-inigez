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

test("Titles < 2 hours", () => {
  const expectedTitles = [
    "WRP 258. Plantilla para mejorar tu productividad basada en OKR",
    "WRP 256. Artista de circo orquestando servicios en AWS con Camilo Nevot",
  ];
  expect(getTitlesBelow2Hours(episodesMock)).toBe(expectedTitles);
});
