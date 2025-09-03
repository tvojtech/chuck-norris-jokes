import { TextShimmer } from '@/components/ui/text-shimmer';

export function Loader({ children = 'Loading...' }: { children: string }) {
  return <TextShimmer>{children}</TextShimmer>;
}
