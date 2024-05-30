export const storeValueInLocalStorage = (key, value) => {
  const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(key, valueToStore);
}


export const getValueFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return
}


export const clearValueFromLocalStorage = (key) => {
  localStorage.removeItem(key);
}