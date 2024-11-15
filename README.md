## todo

### v1 notes

Registration should create user and a store
no admin work yet (v2)

/user

- [x] GET /user/:id - get my user info (no admin yet)
- [ ] PATCH /user - update a user by id

/store

- [x] POST /store - create a store
- [x] GET /store - return all stores by logged in user
- [ ] GET /store/:id - return a store by id
- [ ] PATCH /store/:id - update a store by id

/store/:storeId/item

- [ ] GET /store/:storeId/item - return all items by storeId
- [ ] GET /store/:storeId/item/:id - return an item by storeId and id
