import React, { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card from '../userInterface/card';
import Editable from './editContent'
import classes from './innerText.module.css';

interface listProps {
    item: {
        id: string,
        content: string
    }
    listid: string,
    index: number,
    updated: (enteredValue: string, listid: string, itemid: string) => void;
}

const Context: React.FC<listProps> = ({ item, updated, listid, index }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onUpdate = () => {
        const enteredValue = inputRef.current!.value;
        updated(enteredValue, listid, item.id);
    };

    const colorScheams = {
        Request: classes.leftHeading,
        inProgress: classes.middleHeading,
        done: classes.rightHeading
    }

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div className={classes.area} ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card>
                        <div className={colorScheams[listid as keyof typeof colorScheams]}></div>
                        <Editable
                            text={item.content}
                            placeholder="Write a task name"
                            childRef={inputRef}
                            type="input"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                name="task"
                                placeholder="Write a task name"
                                defaultValue={item.content}
                                onChange={onUpdate}

                            />
                        </Editable>
                    </Card>
                </div>
            )}
        </Draggable>
    )
};

export default Context;