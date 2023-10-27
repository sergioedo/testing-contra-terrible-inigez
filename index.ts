export interface IEpisode {
  number: string;
  title: string;
  excerpt: string;
  published_at: number;
  duration: string;
  id: string;
}

export const getNextEpisodeNumber = (episodes: Array<IEpisode>): number => {
  // ordenar episodios por number
  const sortedEpisodes = episodes.toSorted(
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
  return [];
};
