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
