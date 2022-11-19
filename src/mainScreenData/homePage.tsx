import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import classes from '../mainScreenData/homePage.module.css';
import DraggableElement from "./draggableElement";
import demoData from "../demoData/demoData";

const lists = ["Request", "inProgress", "done"];

interface extractedData {
  content: string,
  id: string,
}

const HomePage: React.FC = () => {
    const dataStorage = `${localStorage.getItem("data")}`;
    const [listItems, setListItems] = useState(JSON.parse(dataStorage) || demoData);

    useEffect(() => {
      // Check browser support
    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("data", JSON.stringify(listItems));
      }
    }, [listItems])
    
    const removeFromList = (list: extractedData[], index: number) => {
      // Array.from is a JavaScript method
      const result = Array.from(list);
      const removed = result.splice(index, 1);
      return [removed, result];
    };
    
    const addToList = (list: extractedData[], index: number, element: extractedData[]) => {
      // Array.from is a JavaScript method
      const result = Array.from(list);
      result.splice(index, 0, element[0]);
      return result;
    };

    const storeItem = (name: string, id: string) => {
      const newArray = {...listItems}
      
      newArray[id as keyof typeof newArray].push({
        id: String(Date.now() + Math.random() * 2),
        content: name,
      });
      setListItems(newArray)
    };

    function handleOnDragEnd(result: DropResult) {
      console.log(result)
        if (!result.destination) return;
        const listCopy = {...listItems};
        
        const sourceList = listCopy[result.source.droppableId as keyof typeof listCopy];
        const [removedElement, newSourceList] = removeFromList(
          sourceList,
          result.source.index
        );
        listCopy[result.source.droppableId as keyof typeof listCopy] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId as keyof typeof listCopy];
         
        listCopy[result.destination.droppableId as keyof typeof listCopy] = addToList(
          destinationList,
          result.destination.index,
          removedElement,
        );

        setListItems(listCopy);
    }

    const onUpdatedArrayValue = (items: string, dataKey: string, itemid: string) => {
      const newObj = listItems[dataKey as keyof typeof listItems]
      
      const newUpdateObj = {...listItems}
  
      const existingItemIndex = newObj.findIndex(
          (item: extractedData ) => item.id === itemid
        );
        
        const existingItem = newObj[existingItemIndex];
    
        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            content: items,
          };
    
          newObj[existingItemIndex] = updatedItem;
          newUpdateObj[existingItem.id as keyof typeof newUpdateObj] = newObj;
          setListItems(newUpdateObj);
        }    
    };

    return (
        <div className={classes.flexbox}>
            <DragDropContext onDragEnd={handleOnDragEnd} onBeforeDragStart={handleOnDragEnd}>
               {lists.map((listKey) => (
                <DraggableElement 
                   elements={listItems[listKey as keyof typeof listItems]}
                   key={listKey}
                   idTitle={listKey}
                   item={storeItem}
                   array={onUpdatedArrayValue}
                />
               ))}
            </DragDropContext>
        </div>
    )
};

export default HomePage;
