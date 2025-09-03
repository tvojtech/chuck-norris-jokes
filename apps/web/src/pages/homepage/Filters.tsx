import { Loader } from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Filters } from "@/pages/homepage/types";
import { trpc } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Filter, FilterX, SearchCheck } from "lucide-react";
import { Suspense, useState } from "react";

export function Filters({
  filters,
  onFiltersChange,
}: {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}) {
  return (
    <FiltersInternal
      key={`${filters.search}-${filters.category}`}
      filters={filters}
      onFiltersChange={onFiltersChange}
    />
  );
}

function FiltersInternal({
  filters,
  onFiltersChange,
}: {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}) {
  const anyFilter = Object.values(filters).some((val) => !!val);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFilters, setEditedFilters] = useState<Filters>(filters);

  const handleSaveFilters = () => {
    onFiltersChange(editedFilters);
    setIsEditing(false);
  };

  const clearSaveFilters = () => {
    onFiltersChange({ category: undefined, search: undefined });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardAction className="flex gap-2">
          {!isEditing && anyFilter && (
            <Button variant="outline" size="icon" onClick={clearSaveFilters}>
              <FilterX />
            </Button>
          )}
          {!isEditing && (
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Filter />
            </Button>
          )}
          {isEditing && (
            <Button variant="default" size="icon" onClick={handleSaveFilters}>
              <SearchCheck />
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <>
            {!anyFilter && <p>Not filter set!</p>}
            {filters.search && <p>Search: {filters.search}</p>}
            {filters.category && <p>Category: {filters.category}</p>}
          </>
        )}
        {isEditing && (
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Search category..."
              value={editedFilters.search || ""}
              onChange={(e) =>
                setEditedFilters({
                  search: e.target.value,
                  category: undefined,
                })
              }
            />
            <Suspense fallback={<Loader>Loading categories...</Loader>}>
              <Categories
                category={editedFilters.category}
                onCategoryChange={(category) =>
                  setEditedFilters({ category, search: undefined })
                }
              />
            </Suspense>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Categories({
  category: selectedCategory,
  onCategoryChange,
}: {
  category?: string;
  onCategoryChange: (category: string) => void;
}) {
  const categories = useSuspenseQuery(trpc.jokeCategories.queryOptions());

  return (
    <div className="flex flex-wrap gap-2">
      {categories.data.map((category) => (
        <Badge
          key={category}
          variant={category === selectedCategory ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
          className="cursor-pointer"
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
