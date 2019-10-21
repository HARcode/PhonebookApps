export default function addPbProperties(item = {}) {
  item.sent = true;
  item.isNew = false;
  item.editOn = false;
  return item;
}
