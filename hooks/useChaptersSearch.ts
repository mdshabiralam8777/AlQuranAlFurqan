import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import quranApi, { Chapter } from "@/services/quranApi";

export type FilterType = "all" | "makkah" | "madinah";

export function useChaptersSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Fetch chapters
  const {
    data: chapters = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["chapters"],
    queryFn: () => quranApi.getChapters(),
  });

  // Derived state: filter and search
  const filteredChapters = useMemo(() => {
    let result = chapters;

    // 1. Filter by revelation place
    if (activeFilter === "makkah") {
      result = result.filter((c: Chapter) => c.revelation_place === "makkah");
    } else if (activeFilter === "madinah") {
      result = result.filter((c: Chapter) => c.revelation_place === "madinah");
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (c: Chapter) =>
          c.name_simple.toLowerCase().includes(lowerQuery) ||
          c.translated_name?.name.toLowerCase().includes(lowerQuery) ||
          c.name_arabic.includes(lowerQuery),
      );
    }

    return result;
  }, [chapters, activeFilter, searchQuery]);

  return {
    chapters,
    filteredChapters,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    isLoading,
    isError,
    error,
  };
}
