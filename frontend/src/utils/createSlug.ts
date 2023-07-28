const createSlug = (title: string) =>
  title.replace(/ +/g, "_").toLocaleLowerCase();

export default createSlug;
