export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Array.from(map);
}

export const concat = (x, y) => x.concat(y);
export const flatMap = (xs, f) => xs.map(f).reduce(concat, []);

export function countSubstrings(text, substring) {
  var m = text.match(
    new RegExp(
      substring.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"),
      "g"
    )
  );
  return m ? m.length : 0;
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
