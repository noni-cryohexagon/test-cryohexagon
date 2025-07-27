import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";
import { NewCase } from "./types";

export function useCases() {
  return useQuery({ queryKey: ["cases"], queryFn: api.listCases });
}

export function useCreateCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newCase: NewCase) => api.createCase(newCase),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}

export function useUpdateCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: Partial<NewCase> }) =>
      api.updateCase(id, changes),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}