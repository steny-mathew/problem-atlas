async function fetchHackerNewsPosts() {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );

  const ids = await response.json();

  const top10 = ids.slice(0, 10);

  const stories = await Promise.all(
    top10.map(async (id) => {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      return await res.json();
    })
  );

  return stories;
}

module.exports = fetchHackerNewsPosts;