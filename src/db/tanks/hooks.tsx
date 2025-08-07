import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";
import { NewTank } from "./types";

export function useTanks() {
  return useQuery({ queryKey: ["tanks"], queryFn: api.listTanks });
}

export function useTank(id: string) {
  return useQuery({
    queryKey: ["tank", id],
    queryFn: () => api.getTank(id),
    enabled: !!id,
  });
}

export function useAvailableTanks() {
  return useQuery({
    queryKey: ["tanks", "available"],
    queryFn: api.getAvailableTanks,
  });
}

export function useTanksByClinic(clinicId: string) {
  return useQuery({
    queryKey: ["tanks", "clinic", clinicId],
    queryFn: () => api.getTanksByClinic(clinicId),
    enabled: !!clinicId,
  });
}

export function useCreateTank() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newTank: NewTank) => api.createTank(newTank),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["tanks"] });
      qc.invalidateQueries({ queryKey: ["tanks", "clinic", data.clinic_id] });
      if (data.is_available) {
        qc.invalidateQueries({ queryKey: ["tanks", "available"] });
      }
    },
  });
}

export function useUpdateTank() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: Partial<NewTank> }) => api.updateTank(id, changes),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["tanks"] });
      qc.invalidateQueries({ queryKey: ["tank", data.id] });
      qc.invalidateQueries({ queryKey: ["tanks", "clinic", data.clinic_id] });
      qc.invalidateQueries({ queryKey: ["tanks", "available"] });
    },
  });
}

export function useToggleTankAvailability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
      api.toggleTankAvailability(id, isAvailable),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["tanks"] });
      qc.invalidateQueries({ queryKey: ["tank", data.id] });
      qc.invalidateQueries({ queryKey: ["tanks", "clinic", data.clinic_id] });
      qc.invalidateQueries({ queryKey: ["tanks", "available"] });
    },
  });
}
