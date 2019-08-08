const xhr = new XMLHttpRequest();
const url = '/getinventory'
xhr.onreadystatechange = () =>{
  if(xhr.readyState===4 && xhr.status===200){
    const inventoryArray=JSON.parse(xhr.responseText);
    populateInventoryTable(inventoryArray);
  }
}
xhr.open("GET", url);
xhr.send();

const populateInventoryTable = (arr) => {
console.log('response array is : ', arr);
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
