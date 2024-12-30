import { QueryClient, useQuery } from "@tanstack/react-query";
import { getDict } from "./api";

export const queryClient = new QueryClient();

export function useDict() {
  return useQuery({
    queryKey: ["dict"],
    queryFn: getDict,
  });
}
