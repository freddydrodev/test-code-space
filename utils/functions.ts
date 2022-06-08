export const f_limitChar = (text: string, limit: number) => {
  if (!text) throw Error("Vous devez ajouter un text");
  if (!limit || limit <= 0) throw Error("limit doit etre superieur a zero");

  return text
    .split("")
    .filter((_, i) => i < limit)
    .join("");
};
