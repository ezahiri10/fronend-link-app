import { trpc } from '../lib/trpc';

export function useLinks() {
  const utils = trpc.useUtils();
  
  const { data: links = [], isLoading } = trpc.links.getAll.useQuery();

  const createLink = trpc.links.create.useMutation({
    onSuccess: () => utils.links.getAll.invalidate(),
  });

  const updateLink = trpc.links.update.useMutation({
    onSuccess: () => utils.links.getAll.invalidate(),
  });

  const deleteLink = trpc.links.delete.useMutation({
    onSuccess: () => utils.links.getAll.invalidate(),
  });

  const reorderLinks = trpc.links.reorder.useMutation({
    onSuccess: () => utils.links.getAll.invalidate(),
  });

  return {
    links,
    isLoading,
    createLink,
    updateLink,
    deleteLink,
    reorderLinks,
  };
}
