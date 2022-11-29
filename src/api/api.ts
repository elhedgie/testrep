export const API = {
  getData: () => request.get("http://82.202.204.94/tmp/test.php"),
};

const handleError = (e: Error) => {
  throw e;
};
const request = {
  get: (url: string) =>
    fetch(url)
      .catch(handleError)
      .then((res) => res.json())
      .then((res) => res),
};
