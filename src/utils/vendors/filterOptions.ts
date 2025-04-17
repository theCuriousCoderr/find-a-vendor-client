export default function filterOptions(filters: string[], option: string) {
  return filters.filter((filter) => filter !== option);
}
