export const getAllPokemon = (url) => {
  // Promise: 全ての処理が終わるまで待つ約束をする
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json()) // res.json(): json形式を指定
      .then((data) => resolve(data));
  });
};
