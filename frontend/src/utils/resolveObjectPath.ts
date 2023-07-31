const resolveObjectPath = (
  object: { [key: string]: any },
  path: string,
  defaultValue = null,
) => path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object);

export default resolveObjectPath;
