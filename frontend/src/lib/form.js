export const showInputLabel = (el) => {
  /**
   * on input show label text on top of input
   * required: relative div element inside which input and absolute span
   */
  const value = el.currentTarget.value;
  if (value.length > 0) el.currentTarget.nextElementSibling?.classList.remove("hidden")
  else el.currentTarget.nextElementSibling?.classList.add("hidden")
}