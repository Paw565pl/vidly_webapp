const paginate = (items: any[], page: number, pageSize: number) =>
  items
    .slice((page - 1) * pageSize, items.length)
    .filter((_, i) => i < pageSize);

export default paginate;
