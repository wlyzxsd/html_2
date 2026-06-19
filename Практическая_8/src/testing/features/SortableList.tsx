import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { List } from '@mui/material';
import { SortableItem } from '../components/SortableItem';  // ← проверь путь!
import { useDispatch, useSelector } from 'react-redux';
import { setDraggedItems } from './quizeSlice';
import { RootState } from '../../store';

interface SortableListProps {
    index: number;
    answers: string[];
    correctAnswers: string[];
}

function SortableList({ index, answers, correctAnswers }: SortableListProps) {
    const dispatch = useDispatch();
    const lists = useSelector((state: RootState) => state.lists.lists);
    const showResults = useSelector((state: RootState) => state.lists.showResults);

    const draggedItems = lists[index] || answers;

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = draggedItems.indexOf(active.id);
            const newIndex = draggedItems.indexOf(over.id);
            const newList = arrayMove(draggedItems, oldIndex, newIndex);
            dispatch(setDraggedItems({ index, items: newList }));
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={draggedItems} strategy={verticalListSortingStrategy}>
                <List>
                    {draggedItems.map((item) => (
                        <SortableItem key={item} item={item} highlight='none'/>
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;