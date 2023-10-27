import { expect, test } from "bun:test";
import APIResponseMock from "./api-response-mock.json";
import { getNextEpisodeNumber } from "./index";

const episodesMock = APIResponseMock.data;

test("Next Episode", () => {
  expect(getNextEpisodeNumber(episodesMock)).toBe(267);
});
