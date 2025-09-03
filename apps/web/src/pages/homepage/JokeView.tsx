import { useQuery } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextEffect } from '@/components/ui/text-effect';
import type { Filters } from '@/pages/homepage/types';
import { trpc } from '@/utils/trpc';

export function JokeView({ filters: { search, category } }: { filters: Filters }) {
  const joke = useQuery(trpc.joke.queryOptions({ search, category }));
  useHotkeys(
    'r',
    () => {
      if (!search) joke.refetch();
    },
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current joke</CardTitle>
        <CardAction>
          {!search && (
            <Button variant="outline" size="icon" className="size-8 cursor-pointer" onClick={() => joke.refetch()}>
              <RefreshCcw />
            </Button>
          )}
        </CardAction>
        <CardDescription>{!search && <p>Press &apos;r&apos; to fetch another random joke.</p>}</CardDescription>
      </CardHeader>
      <CardContent>
        {joke.isError ? (
          <ErrorMessage>Failed to load a joke</ErrorMessage>
        ) : joke.isFetching ? (
          <Loader>Loading a joke...</Loader>
        ) : !joke.data ? (
          <p>No joke found</p>
        ) : (
          <TextEffect>{joke.data.value}</TextEffect>
        )}
      </CardContent>
    </Card>
  );
}
