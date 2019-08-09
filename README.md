# Week6-DFIO

Victor, Jack, Reuben, Tony

Installation

- git clone git@github.com:fac-17/Week6-DFIO.git
- cd into folder
- npm install
- npm start

### Agreements
* Use ES6
* Branches named Feature/branch
* Work on remote branches together
* Never push to master
* Use const for any variables that don't change
* use === not == 
* Ensure roughly equal commits

### Requirements

- Simple web app with a **node server** and a **database**.
- **Content dynamic**, but DOM manipulation kept to a minimum
- **Mobile-first design**
- Your database comes with **a schema**, which should be documented in your readme (along with any other architectural decisions).
- Database **hosted on Heroku**, or locally.
- **Build script for your database**.
- **Security concerns** appropriately considered (you must protect against script injections!).

- Clear **user journey** (even if you take one of our suggested ideas, document the user journey in your readme)
- Test your server routes with **supertest**
- Test your **pure functions** both server and client side
- Set up a **test database** so that you can test your database queries


---

### Ideas 💡

- Interesting articles
- Railway system
- Upload your favourite worst movies (or albums), everyone else can comment and/or upvote it
- **Fantasy shop**



---

### User journey

- First screen: Enter your name
- Second screen: Shop with a list of item + price. Also shows current user and coins left
- Third screen: Leaderboard(stretch goal)


---

### Database Schema 🗺

https://www.lucidchart.com/documents/edit/c79acf78-839b-4481-b6c8-f4475aff4a22/0

![](https://i.imgur.com/guxfo63.png)



---

### Main goals 🥅

- User can enter username and gets assigned coin allocation.
- User can access the shop and select items.
- User coin allocation gets updated accordingly.
- Security against SQL injections.
- Include test database to test queries.

---

### Stretch goals 🤸‍♀️

- [x]  User can view full list of items owned.
```javascript=
const populateSatchel = (arr) => {
  const satchelTable = document.querySelector(".satchel_table");
  while (satchelTable.firstChild) {
    satchelTable.firstChild.remove()
  }
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
```
- [ ] User can buy multiple items.
- [ ] User can get refunds or exchange items.
- [x] Items get (hidden) power value to compare with other users.
- [ ] Log back in and play again (keep the score)


---


## Steps
### Day 1
- [x] Build File Structure - separate front-end backend
- [x] Install dependencies and link to package.json
- [x] Skeleton HTML, CSS
- [x] Setup server files - server router handler
- [x] Setup database connection js file
- [x] Get heroku setup
- [x] Setup Travis
- [x] Add env variables inside travis
- [x] Build database on heroku
- [x] Write build script
- [x] Setup test DATABASE - 
- [x] do the following on your local terminal
CREATE DATABASE final_factasy_db_test;
CREATE USER final_factasy WITH SUPERUSER PASSWORD 'waterbottle';
ALT 
- [x] Create env file and add links


### Afternoon 1
* Split up: pair 1: setup testing, pair 2: setup basic server files. Whoever finishes first finish off deploying to heroku/travis
* Come together to create database files and database testing

## Day 2
 Write sample tests for 
- [x] Front end pure functions (tape)
- [x] Server endpoints (supertest)
- [x] Test database (getData function)
- [ ] Write backend JS + SQL to GET and POST info to database
    - [x] Create new user in user table
    - [x] Buy items. 
        - [x] Reduce gold in user table
        - [x] Reduce quantity in inventory table
        - [x] Create new row in ownership table
    - [x]  Get score of user from from all three tabls 
    - [x] Return what specific user owns from ownership table
- [ ] convert sql queries to use variables from user input
- [ ] Write   -front end JS to render call back end and render DOM 
    - [ ] Back end server call 
    - [ ] Create new user with post
    - [ ] 'Log in' with user
    - [ ] Render current inventory 
    - [ ] Render current user ownership
    - [ ] Item with quantity = 0 becomes non-available
    - [ ] Helper function to stream chunks of data
- [ ] Plan breaks
- [ ] PROTECT AGAINST SQL INJECTION.
- [ ] Do Readme
    - [ ] Installation instructions
    - [ ] User journey
    - [ ] Schema




---



### Things learned 👀

---


#### cannot insert multiple commands into a prepared statement

![](https://i.imgur.com/8izyhv8.png)


![](https://i.imgur.com/i8n3mmp.png)

---

#### (Insecure) Solution

![](https://i.imgur.com/x9yHVe1.png)


---

#### Confusing double-negative on `t.error`

```javascript=
t.error(err, "No Error"); 
//Assert that db_build finished 
//successfully with no errors
```

--- 

#### Making API calls with forms 

```html=
<form class="form" autocomplete="off" action="/newuser" method="post">
```
--- 

#### ORDER BY is important for database tests

Tests require the results to be in a specific order even if we don't. We had to order our results on an arbitray value just to get the tests to pass.

--- 

#### SQL Query Example 1

Update a user's wallet after they've purchased an item:

```js=
databaseConnection.query(`UPDATE users SET gold_pieces = gold_pieces - 1 WHERE name = 'Jon';
      UPDATE inventory
      SET item_quantity = item_quantity - 1
      WHERE item_name = 'Cape';
      INSERT INTO ownership(owner_id, item_id)
      VALUES ((SELECT id FROM users WHERE name = 'Jon'), (SELECT id FROM inventory WHERE item_name = 'Cape') )`
```

---

#### SQL Query Example 2 

Get score for all users by joining three tables
```js=
databaseConnection.query(`SELECT users.name, SUM(inventory.item_power)
    FROM users
    INNER JOIN ownership
    ON users.id = ownership.owner_id
    INNER JOIN inventory
    ON inventory.id = ownership.item_id
    GROUP BY users.id`

```

---



#### Default Values in the database

```sql=
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  ...
  item_quantity INTEGER DEFAULT 0,
  item_price INTEGER DEFAULT 20,
  item_power INTEGER DEFAULT 0
);
```

---

#### Dynamically create unique buttons

Add an `onclick` attribute
```javascript=
let newItemButton = document.createElement('button');
    newItemButton.innerText = 'Buy now';
    newItemButton.classList.add('buy-now');
    newItemButton.setAttribute('onclick', `buyItem('${item.item_name}')`);
    newItem.appendChild(newItemButton);
```
Which translates in html to:
```html=
<button class="buy-now" onclick="buyItem('Dagger')">Buy now</button>
```

---

#### Run build script

- Create a local test database
- Run your build script with \i and route to build file

- also run the build script once on the remote database


---

#### Test Queries manually in pgcli first

![](https://i.imgur.com/gAjFcCa.png)



--- 

#### Testing the database

Here testing the `buy item` function:
```js=

test('Reduce quantity in inventory table after purchase', (t) => {
    runDbBuild((err, res) => {
        t.error(err, 'No error');
        
        let expected = [{ item_name: 'Dagger', item_quantity: 3, item_price: 8 }, { item_name: 'Cape', item_quantity: 4, item_price: 3 }, { item_name: 'Walking stick', item_quantity: 10, item_price: 2 }, { item_name: 'Toothbrush', item_quantity: 2, item_price: 10 }]

        queries.buyItem((err, result) => {
            if (err) console.log(err);
            //select inventory inside callback for buyItem(wait for completion of buyItem before trying to select the inventory)
            queries.getInventory((err, result) => {
                if (err) console.log(err);
                t.deepEqual(result, expected, 'Cape should have a quantity of 4')
                t.end();
            })
        })
    })
})

````



---

#### Remember that local db is only for testing


![](https://i.imgur.com/rs4AoEk.png)

--- 

#### Tests were helpful but...

* Still need direction to make sure you are building the right functions...
* ..and they take the right arguments etc. e.g. username vs user id

---

* How to test SQL functions that only update - don't return values - nest a select query inside, and test the  response from that.

```js=
queries.buyItem((err, result) => {
  if (err) console.log(err);
  queries.getUsers((err, result) => {
    if (err) console.log(err);
    t.deepEqual(result, expected, 'Jon should have 1 less gold piece')
    t.end()
})
```

---

#### Time spent debugging after forgetting to export a function:
... approximately 10 minutes per hour 💪
```js
module.exports = {
    handleHome,
    handlePublic,
    handleDbNewUser,
    handleGetInventory,
    handleDbLogin,
    handleGetUser,
    handleBuyItem
};

```
---

#### Abstracting the data streamer

![](https://i.imgur.com/1uZKhKU.png)


---

#### We started to enjoy writing SQL in JS

![](https://i.imgur.com/NKTJ0bO.png)


---

#### Router game getting strong
...headache game getting even stronger 🤯

```js=
else if (endpoint.includes('public')) {
    handlers.handlePublic(request, response);
  } else if (endpoint.includes('/newuser')) {
    handlers.handleDbNewUser(request, response);
  } else if (endpoint.includes('/login')) {
    handlers.handleDbLogin(request, response);
  } else if (endpoint.includes('/getinventory')) {
    handlers.handleGetInventory(request, response);
  } else if (endpoint.includes('/getitemsowned')) {
    handlers.handleGetItemsOwned(request, response);
  } else if (endpoint.includes('/buyitem')) {
    handlers.handleBuyItem(request, response);
  } else if (endpoint.includes('/getuser')) {
    handlers.handleGetUser(request, response);
```

---


...




