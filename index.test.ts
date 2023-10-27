import { expect, test } from "bun:test";
import episodesMock from "./api-response-mock.json";
import { getNextEpisodeNumber } from "./index";

test("Next Episode", () => {
  expect(getNextEpisodeNumber(episodesMock)).toBe(266);
});
