import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

    // Update state by passing the array of items to setItems  
    useEffect(() => {
      fetch("http://localhost:4000/items")
        .then((r) => r.json())
        // .then((items) =>console.log(items));
        .then((items) => setItems(items))
    }, []);

    // ...rest of component

     // add this callback function

     function handleUpdateItem(updatedItem) {
      const updatedItems = items.map((item) => {
        if (item.id === updatedItem.id) {
          return updatedItem;
        } else {
          return item;
        }
      });
      setItems(updatedItems);
    }

  function handleAddItem(newItem) {
    // console.log("In ShoppingList:", newItem);
    setItems([...items, newItem]);
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleDeleteItem(deletedItem) {
    // console.log("In ShoppingCart:", deletedItem);
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }


  return (
    <div className="ShoppingList">
     {/* add the onAddItem prop! */}
     <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
          {/* pass it as a prop to Item */}
          {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
