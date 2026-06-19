import {DndContext, closestCenter} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import List from '@mui/material/List';
import {SortableItem} from '../components/SortableItem';
import { Action } from '@dnd-kit/core/dist/store';

import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { setDraggedItems } from './quizeSlice';
import { RootState } from '../../store';
import { useDataset } from '@mui/x-charts';

interface ComponentProps {
    index: number,
    answers: string[]
}

function SortableList({index, answers}: ComponentProps) {
    const dispatch = useDispatch();
    const arr = useSelector((state: RootState) => state.lists.lists[index]);
    const draggedItems = arr || [];

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        if (active.id !== over.id) {
            const oldIndex = draggedItems.indexOf(active.id);
            const newIndex = draggedItems.indexOf(over.id);
            const newList = arrayMove(draggedItems, oldIndex, newIndex);
            dispatch(setDraggedItems({index, items: newList}));
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={draggedItems} strategy={verticalListSortingStrategy}>
                <List>
                    {draggedItems.map((item) => (
                        <SortableItem key={item} item={item} />
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;