import { zodValidator } from "@tanstack/zod-adapter";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import z from "zod";
import { Filters } from "@/pages/homepage/Filters";
import { JokeView } from "@/pages/homepage/JokeView";

const defaultValues = {
  search: "",
  category: "",
};

const searchSchema = z.object({
  search: z.string().optional().default(defaultValues.search),
  category: z.string().optional().default(defaultValues.category),
});

export const Route = createFileRoute("/")({
  component: HomeComponent,
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
});

function HomeComponent() {
  const navigate = Route.useNavigate();
  const filters = Route.useSearch();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="grid gap-4">
        <div>
          <Filters
            filters={filters}
            onFiltersChange={(filters) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  search: filters.search,
                  category: filters.category,
                }),
              });
            }}
          />
        </div>
        <div>
          <JokeView filters={filters} />
        </div>
      </div>
    </div>
  );
}
