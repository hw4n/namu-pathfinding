let re = /\[{2}((?!http|파일|분류|@).+?)[#|\]]/gm;

export function getEveryLinkFromText(text) {
  const result = [];
  let lastfound;

  while ((lastfound = re.exec(text)) !== null) {
    result.push(lastfound[1]);
  }

  return result;
}
