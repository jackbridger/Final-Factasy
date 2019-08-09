const getInventoryData = () => {
  const xhr = new XMLHttpRequest();
  const url = '/getinventory'
  xhr.onreadystatechange = () =>{
    if(xhr.readyState===4 && xhr.status===200){
      const inventoryArray=JSON.parse(xhr.responseText);
      console.log(inventoryArray);
      populateInventoryTable(inventoryArray);
    }
  }
  xhr.open("GET", url);
  xhr.send();
}

getInventoryData();

const populateInventoryTable = (arr) => {
  const inventoryTable = document.querySelector(".inventory_table");
  arr.forEach(item => {
    let newItem = document.createElement('tr');
    // Item details filled in
    let newItemName = document.createElement('th');
    newItemName.innerText = item.item_name;
    newItem.appendChild(newItemName);
    let newItemQuantity = document.createElement('th');
    newItemQuantity.innerText = item.item_quantity;
    newItem.appendChild(newItemQuantity);
    let newItemPrice = document.createElement('th');
    newItemPrice.innerText = item.item_price;
    newItem.appendChild(newItemPrice);
    // Button added
    let newItemButton = document.createElement('button');
    newItemButton.innerText = 'Buy now';
    newItemButton.classList.add('buy-now');
    newItemButton.setAttribute('onclick', `buyItem('${item.item_name}')`);
    newItem.appendChild(newItemButton);
    // Full new row added
    inventoryTable.appendChild(newItem);
  })
}


const buyItem = (itemName) => {
  const xhr = new XMLHttpRequest();
  const url = `/buyitem?${itemName}`
  xhr.onreadystatechange = () =>{
    if(xhr.readyState===4 && xhr.status===200){
      const updatedSatchel=JSON.parse(xhr.responseText);
      //update inventory
      getInventoryData();
      populateSatchel();
    }
  }
  xhr.open("GET", url);
  xhr.send();
}

const populateSatchel = (arr) => {
  const satchelTable = document.querySelector(".satchel_table");
  arr.forEach(item => {
    let newItem = document.createElement('tr');
    // Item details filled in
    let newItemName = document.createElement('th');
    newItemName.innerText = item.item_name;
    newItem.appendChild(newItemName);
    let newItemDescription = document.createElement('th');
    newItemDescription.innerText = item.item_description;
    newItem.appendChild(newItemDescription);
    let newItemPower = document.createElement('th');
    newItemPower.innerText = item.item_power;
    newItem.appendChild(newItemPower);
    // Full new row added
    satchelTable.appendChild(newItem);
  })
}

// const request = (url,cb) => {
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     if(xhr.readyState === 4 && xhr.status === 200)
//     {
//       cb(null, xhr.responseText);
//     }
//     else{
//       cb(new Error);
//     }
//   }
//   xhr.open('GET', url, )
// }
