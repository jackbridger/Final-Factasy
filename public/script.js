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
    let newItemName = document.createElement('th');
    newItemName.innerText = item.item_name;
    newItem.appendChild(newItemName);
    let newItemPrice = document.createElement('th');
    newItemPrice.innerText = item.item_price;
    newItem.appendChild(newItemPrice);
    let newItemQuantity = document.createElement('th');
    newItemQuantity.innerText = item.item_quantity;
    newItem.appendChild(newItemQuantity);
    inventoryTable.appendChild(newItem);
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
