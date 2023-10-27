export interface IEpisode {
  number: string;
  title: string;
  excerpt: string;
  published_at: number;
  duration: string;
  id: string;
}

export const getNextEpisodeNumber = (episodes: Array<IEpisode>) => {
  // ordenar episodios por number
  const sortedEpisodes = episodes.toSorted(
    (a, b) => parseInt(a.number, 10) - parseInt(b.number, 10)
  );

  // Calcular el siguiente episode number
  const nextEpisodeNumber =
    parseInt(sortedEpisodes[sortedEpisodes.length - 1].number, 10) + 1;

  return nextEpisodeNumber;
};

export const getTotalDuration = (episodes: Array<IEpisode>) => {
  // Calcular la suma total de duration
  const totalDuration = episodes.reduce(
    (sum, ep) => sum + parseInt(ep.duration, 10),
    0
  );
  return totalDuration;
};

export const getShortestEpisodeNumber = (episodes: Array<IEpisode>) => {};
export const getTitlesBelow2Hours = (episodes: Array<IEpisode>) => {};
