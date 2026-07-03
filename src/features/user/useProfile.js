import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  createProfile,
  updateProfile,
} from "../../services/apiProfiles";

export function useProfile(userId) {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: ({ name }) => createProfile(userId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updates) => updateProfile(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  return {
    profile,
    isLoading,
    error,
    createProfile: createMutation.mutate,
    updateProfile: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}
