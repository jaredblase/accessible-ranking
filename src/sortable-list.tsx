import { useEffect, useState } from 'react'

import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DndContextProps,
	type DragEndEvent,
	type UniqueIdentifier,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from './sortable-item'

export function SortableList({ initItems }: { initItems: Array<string> }) {
	const [items, setItems] = useState<Array<string>>([])
	const getPosition = (id: UniqueIdentifier) => items.indexOf(id as string) + 1
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)
	const accessibility = {
		screenReaderInstructions: {
			draggable: `To pick up a journey phase, press space or enter.
      Use the up and down arrow keys to update the ranking of the phase in the list.
      Press space or enter again to drop the phase in its new position, or press escape to cancel`,
		},
		announcements: {
			onDragStart({ active }) {
				return `Picked up journey phase ${active.id}. Currently at position ${getPosition(active.id)} of ${items.length}`
			},
			onDragOver({ active, over }) {
				if (over?.id == active.id) {
					return `Picked up journey phase ${active.id}. Currently at position ${getPosition(active.id)} of ${items.length}`
				}

				if (over) {
					return `Phase ${active.id} was moved to position ${getPosition(over.id)} of ${items.length} replacing ${over.id}.`
				}

				return `Phase ${active.id} is no longer over a droppable area.`
			},
			onDragEnd({ active, over }) {
				if (active.id == over?.id) {
					return `Picked up journey phase ${active.id}. Currently at position ${getPosition(active.id)} of ${items.length}`
				}

				if (over) {
					return `Phase ${active.id} was dropped over ${over.id}`
				}

				return `Phase ${active.id} was dropped.`
			},
			onDragCancel({ active }) {
				return `Dragging was cancelled. Phase ${active.id} was dropped.`
			},
		},
	} satisfies DndContextProps['accessibility']

	useEffect(() => setItems(initItems), [initItems])

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			accessibility={accessibility}
		>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{items.map((item) => (
					<SortableItem key={item} id={item}>
						{item}
					</SortableItem>
				))}
			</SortableContext>
		</DndContext>
	)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (over && active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(String(active.id))
				const newIndex = items.indexOf(String(over.id))

				return arrayMove(items, oldIndex, newIndex)
			})
		}
	}
}
