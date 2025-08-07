import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";
import { NewCell } from "./types";

export function useCells() {
  return useQuery({ queryKey: ["cells"], queryFn: api.listCells });
}

export function useCell(id: string) {
  return useQuery({
    queryKey: ["cell", id],
    queryFn: () => api.getCell(id),
    enabled: !!id,
  });
}

export function useCellsByTank(tankId: string) {
  return useQuery({
    queryKey: ["cells", "tank", tankId],
    queryFn: () => api.getCellsByTank(tankId),
    enabled: !!tankId,
  });
}

export function useCreateCell() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newCell: NewCell) => api.createCell(newCell),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cells"] }),
  });
}

export function useUpdateCell() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: Partial<NewCell> }) => api.updateCell(id, changes),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["cells"] });
      qc.invalidateQueries({ queryKey: ["cell", data.id] });
      qc.invalidateQueries({ queryKey: ["cells", "tank", data.tank_id] });
    },
  });
}

export function useToggleCellInTank() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isInTank }: { id: string; isInTank: boolean }) => api.toggleCellInTank(id, isInTank),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["cells"] });
      qc.invalidateQueries({ queryKey: ["cell", data.id] });
      qc.invalidateQueries({ queryKey: ["cells", "tank", data.tank_id] });
    },
  });
}
