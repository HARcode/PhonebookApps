export function compareObjects(a = {}, b = {}) {
  let nameOfA = a.name.toLowerCase();
  let nameOfB = b.name.toLowerCase();
  if (nameOfA < nameOfB) return -1;
  if (nameOfA > nameOfB) return 1;
  return 0;
}
