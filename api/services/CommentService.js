module.exports = {
  async addCommentsToMovies(movies) {
    const comments = await Comment.find();
    const movieData = movies.reduce((acc, cur) => {
      const foundComments = comments.filter((comment) => comment.episodeId === cur.episode_id);
      acc.push({ title: cur.title, opening_crawl: cur.opening_crawl, comments: foundComments });
      return acc;
    }, []);
    return movieData;
  },
};
