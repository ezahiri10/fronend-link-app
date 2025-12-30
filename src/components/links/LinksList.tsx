import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LinkItem } from "./LinkItem";

interface LinksListProps {
  links: Array<{
    id: number;
    platform: string;
    url: string;
  }>;
  onUpdate: (id: number, platform: string, url: string) => void;
  onDelete: (id: number) => void;
  onReorder: (reorderedLinks: Array<{ id: number; position: number }>) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function LinksList({ links, onUpdate, onDelete, onReorder, isUpdating, isDeleting }: LinksListProps) {
  const [items, setItems] = useState(links);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (JSON.stringify(items) !== JSON.stringify(links)) {
    setItems(links);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      const reorderedLinks = newItems.map((item, index) => ({
        id: item.id,
        position: index,
      }));
      onReorder(reorderedLinks);
    }
  };

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <img
          src="/assets/images/illustration-empty.svg"
          alt="No links yet"
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-xl font-bold text-text-dark mb-2">
          Let's get you started
        </h2>
        <p className="text-sm text-text-gray max-w-md">
          Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them.
        </p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {items.map((link, index) => (
            <LinkItem
              key={link.id}
              link={link}
              index={index}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
