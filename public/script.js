const request = (url,cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200)
    {
      cb(null, xhr.responseText);
    }
    else{
      cb('error' + xhr.responseType);
    }
  }
  xhr.open('GET', url, )
}

request ('/getinventory', (err,response) => {
  if(err) console.log(err);
  else
  const inventoryArr=response;
  console.log(inventoryArr);
}
