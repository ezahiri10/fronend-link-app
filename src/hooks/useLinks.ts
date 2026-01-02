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
    onMutate: async (variables) => {
      await utils.links.getAll.cancel();
      
      const previousLinks = utils.links.getAll.getData();
      
      if (previousLinks) {
        const reorderedLinks = variables.links.map(({ id, position }) => {
          const link = previousLinks.find(l => l.id === id);
          return link;
        }).filter(Boolean);
        
        utils.links.getAll.setData(undefined, reorderedLinks as any);
      }
      
      return { previousLinks };
    },
    onError: (err, newLinks, context) => {
      if (context?.previousLinks) {
        utils.links.getAll.setData(undefined, context.previousLinks);
      }
    },
    onSettled: () => {
      utils.links.getAll.invalidate();
    },
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
