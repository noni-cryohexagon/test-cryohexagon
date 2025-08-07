import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";
import { NewClinic } from "./types";

export function useClinics() {
  return useQuery({ queryKey: ["clinics"], queryFn: api.listClinics });
}

export function useClinic(id: string) {
  return useQuery({
    queryKey: ["clinic", id],
    queryFn: () => api.getClinic(id),
    enabled: !!id,
  });
}

export function useActiveClinics() {
  return useQuery({
    queryKey: ["clinics", "active"],
    queryFn: api.getActiveClinics,
  });
}

export function useClinicsByCity(city: string) {
  return useQuery({
    queryKey: ["clinics", "city", city],
    queryFn: () => api.getClinicsByCity(city),
    enabled: !!city,
  });
}

export function useCreateClinic() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newClinic: NewClinic) => api.createClinic(newClinic),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["clinics"] });
      qc.invalidateQueries({ queryKey: ["clinics", "city", data.city] });
      if (data.is_active) {
        qc.invalidateQueries({ queryKey: ["clinics", "active"] });
      }
    },
  });
}

export function useUpdateClinic() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: Partial<NewClinic> }) => api.updateClinic(id, changes),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["clinics"] });
      qc.invalidateQueries({ queryKey: ["clinic", data.id] });
      qc.invalidateQueries({ queryKey: ["clinics", "city", data.city] });
      qc.invalidateQueries({ queryKey: ["clinics", "active"] });
    },
  });
}

export function useToggleClinicActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => api.toggleClinicActive(id, isActive),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["clinics"] });
      qc.invalidateQueries({ queryKey: ["clinic", data.id] });
      qc.invalidateQueries({ queryKey: ["clinics", "city", data.city] });
      qc.invalidateQueries({ queryKey: ["clinics", "active"] });
    },
  });
}
