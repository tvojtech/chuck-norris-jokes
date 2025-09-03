import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { trpc } from '@/utils/trpc';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HeadContent, Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '../index.css';
import PageLoader from '@/components/page-loader';

export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'chuck-norris-jokes',
      },
      {
        name: 'description',
        content: 'Jokes about Chuck Norris',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: s => s.isLoading,
  });

  return (
    <>
      <HeadContent />
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange storageKey="vite-ui-theme">
        <div className="grid h-svh grid-rows-[auto_1fr]">
          <Header />
          {isFetching ? <PageLoader /> : <Outlet />}
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
    </>
  );
}
