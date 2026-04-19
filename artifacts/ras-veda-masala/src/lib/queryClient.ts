import { QueryClient, QueryFunctionContext } from "@tanstack/react-query";

export async function queryFn<T>({ queryKey }: QueryFunctionContext): Promise<T> {
  const [url] = queryKey as [string];
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  const response = await fetch(`${baseUrl}${url}`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
