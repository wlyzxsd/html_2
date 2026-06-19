import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import { SortableItem } from '../components/SortableItem';
import { useDispatch, useSelector } from 'react-redux';
import { addList, setDraggedItems } from './quizeSlice';
import { RootState } from '../../store';
import { useEffect } from 'react';

interface SortingProps {
    index: number;
    tasks: { question: string; answer: string }[];
}

function Sorting({ index, tasks }: SortingProps) {
    const dispatch = useDispatch();
    const arr = useSelector((state: RootState) => state.lists.lists[index]);
    const showResults = useSelector((state: RootState) => state.lists.showResults);

    const correctItems = [...tasks]
        .sort((a, b) => parseInt(a.answer) - parseInt(b.answer))
        .map(t => t.question);

    useEffect(() => {
        if (!arr) {
            const shuffled = [...correctItems].sort(() => Math.random() - 0.5);
            dispatch(addList({ index, items: shuffled }));
        }
    }, []);

    const draggedItems = arr || [];

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

export default Sorting;