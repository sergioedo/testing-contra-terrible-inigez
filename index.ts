export interface IEpisode {
  number: string;
  title: string;
  excerpt: string;
  published_at: number;
  duration: string;
  id: string;
  valid: boolean;
}

export interface ITerribleEpisode {
  number?: string | number;
  title?: string;
  excerpt: string;
  published_at: number;
  duration?: string | number;
  id: string;
  supercoco?: string | number;
}

const getValidEpisodes = (context: string, episodes: Array<IEpisode>) => {
  const validEpisodes = episodes.filter((e) => e.valid);
  const numInvalidEpisodes = episodes.length - validEpisodes.length;
  if (numInvalidEpisodes > 0)
    console.error(
      `${context}: Sr. Iñigez, se han descartado ${numInvalidEpisodes} episodios inválidos!`
    );
  return validEpisodes;
};

export const getNextEpisodeNumber = (episodes: Array<IEpisode>): number => {
  const validEpisodes = getValidEpisodes("getNextEpisodeNumber", episodes);
  // ordenar episodios por number
  const sortedEpisodes = validEpisodes.toSorted(
    (a, b) => parseInt(a.number, 10) - parseInt(b.number, 10)
  );

  // Calcular el siguiente episode number
  const nextEpisodeNumber =
    parseInt(sortedEpisodes[sortedEpisodes.length - 1].number, 10) + 1;

  return nextEpisodeNumber;
};

export const getTotalDuration = (episodes: Array<IEpisode>): number => {
  // Calcular la suma total de duration
  const totalDuration = episodes.reduce(
    (sum, ep) => sum + parseInt(ep.duration, 10),
    0
  );
  return totalDuration;
};

export const getShortestEpisodeNumber = (episodes: Array<IEpisode>): number => {
  // Encontrar el episode más corto
  const shortestEpisode = episodes.reduce(
    (shortest, ep) => (ep.duration < shortest.duration ? ep : shortest),
    episodes[0]
  );
  return parseInt(shortestEpisode.number);
};

export const getTitlesBelow2Hours = (
  episodes: Array<IEpisode>
): Array<string> => {
  // Crear una lista aleatoria y seleccionar titles de episodios que sumen menos de 2 horas
  const shuffledEpisodes = episodes.toSorted(() => Math.random() - 0.5);
  const twoHourLimit = 2 * 60 * 60; // 2 horas en segundos
  let durationSum = 0;
  const selectedTitles: string[] = [];
  for (const ep of shuffledEpisodes) {
    if (durationSum + parseInt(ep.duration, 10) <= twoHourLimit) {
      durationSum += parseInt(ep.duration);
      selectedTitles.push(ep.title);
    }
  }
  return selectedTitles;
};

export const parseEpisode = (episode: ITerribleEpisode): IEpisode => {
  return {
    ...episode,
    title: episode?.title || "",
    number: episode?.number?.toString() || "",
    duration: episode?.duration?.toString() || "-1",
    valid:
      episode.duration !== undefined &&
      episode.number !== undefined &&
      episode.title !== undefined,
  };
};
