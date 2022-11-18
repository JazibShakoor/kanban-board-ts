import { Droppable } from "react-beautiful-dnd";
import React from "react";
import classes from './homePage.module.css'
import InnerText from "../Components/innerText";
import Editable from "../Components/editTable";

interface TodoListProps {
    elements: {
        id: string,
        content: string
    }[];
    idTitle: string,
    item: (name: string, id: string) => void;
    array: (items: string, keyId: string, itemId: string) => void;
}

const DraggableElement: React.FC<TodoListProps> = (props) => {
    const addItem = (name: string) => {
        props.item(name, props.idTitle);
    };

    const onUpdatedData = (updatedArray: string, dataKey: string, itemid: string) => {
        props.array(updatedArray, dataKey, itemid);
    };

    const colorScheams = {
        Request: classes.mainHeading,
        inProgress: classes.middleHeading,
        done: classes.sideHeading
    }


    return (
        <div className={classes.innerBox}>
            <div className={colorScheams[props.idTitle as keyof typeof colorScheams]}>
                <h3>{props.idTitle}</h3>
            </div>
            <Droppable droppableId={`${props.idTitle}`}>
                {(provided) => (
                    <div className={`${classes.Card} ${classes['custom-scrollbar']}`} {...provided.droppableProps} ref={provided.innerRef}>
                        <Editable
                            displayClass="app_boards_add-board"
                            editClass="app_boards_add-board_edit"
                            placeholder="Enter Board Name"
                            text="Add Board"
                            buttonText="Add Board"
                            onSubmit={addItem}
                        />
                        {props.elements.map((item, index) => (
                            <InnerText key={item.id} listid={props.idTitle} item={item} index={index} updated={onUpdatedData} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
};

export default DraggableElement;
