import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  //items state is needing update to render/ fetch items

  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(resp => resp.json())
    .then(items => setItems(items))
  },[])

  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item)=> item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  function handleUpdateItem(updatedItem){
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id){
        return updatedItem;
      } else{
        return item;
      }
    })
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function handleAddItem(newItem){
   setItems([...items, newItem]);

  }


  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeletedItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
