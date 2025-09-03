export function ErrorMessage({ children }: { children: string }) {
  return <p className="text-red-500">{children}</p>;
}
