export const getNextEpisodeNumber = (episodes) => {
  // ordenar episodios por number
  const sortedEpisodes = episodes.toSorted(
    (a, b) => parseInt(a.number, 10) - parseInt(b.number, 10)
  );

  // Calcular el siguiente episode number
  const nextEpisodeNumber =
    parseInt(sortedEpisodes[sortedEpisodes.length - 1].number, 10) + 1;

  return nextEpisodeNumber;
};
