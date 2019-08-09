# Week6-DFIO

git clone git@github.com:fac-17/Week6-DFIO.git
cd into folder
npm install
npm start


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
- Fantasy shop

### User Journey
- A simple web app for a fantasy game shop
- A user can come to the site, create a user or login and then purchase items with a set amount of gold.

- First screen: Enter your name
- Second screen: Table comes up with all names + individual coin allocation
- Third screen: Shop with list of item + price


### Setup test database locally

```
CREATE DATABASE final-factasy-db-test
CREATE USER young-warrior

```


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

- User can view full list of items owned.
- User can buy multiple items.
- User can get refunds or exchange items.
- Items get (hidden) power value to compare with other users.
- Log back in and play again (keep the score)
- use TRIGGERS to update different tables in one sql batch command

---

### Things learned 👀

```javascript=
t.error(err, "No Error"); 
//Assert that db_build finished 
//successfully with no errors
```
- Default Values
- Forms 
- Run build script 
- ORDER BY 
- Tests require the results to be in a specific order even if we don't. We had to order our results on an arbitray value just to get the tests to pass.
...

---

### Struggles ☠️

...



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
