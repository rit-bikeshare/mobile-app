export default function parseDeepLink(link) {
  const regex = /rit-bikeshare:\/\/(check-out|check-in)\/([a-zA-Z0-9-_]+)/;
  const result = regex.exec(link);
  if (result) {
    return [result[1], result[2]];
  }
  return [null, null];
}
