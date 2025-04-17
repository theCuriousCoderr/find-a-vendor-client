export default function updateCustomDropdownOptions(
  filters: string[],
  dropdownOptions: string[]
) {
  const lowercasedFilters = filters.map((filter) => filter.toLowerCase());
  return dropdownOptions.filter((option) =>
    new Set(lowercasedFilters).has(option.toLowerCase())
  );
}
