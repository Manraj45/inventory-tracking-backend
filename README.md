# Inventory Tracking by Manraj Rai

## Prerequisites:
- NodeJS (12 or above)
- MySQL (Workbench)

## Technologies
Backend:
- Node
- Typescript
- Express (web framework)
- Tsyringe (dependency injection)
- Sequelize (ORM)

Frontend:
 - React

## Project Setup
1. Clone this repository

2. Initialize a MySql server and create a database (for this project, the database name can be set to `inventory_tracking_backend`)

3. In the folder `backend/`, create a `.env` file. The content of the file should be the following:

```
DB_NAME="name of your database"
DB_HOSTNAME="hostname of your database"
DB_USERNAME="username of your database"
DB_PASSWORD="password of your database"
PRODUCTION="false"
```

4. In the file `backend/src/main/config/config.js`, in the section development, enter the `username`, `password`, `database` and `host` of your database.

5. Go to the following directory: `backend/src/main/` and run the following command: `npx sequelize-cli db:migrate`. This will create the table in the database.

## Running the project
### Locally (With Scripts)
To run the project locally, make sure to have a MySQL database setup.

1. Open a terminal and navigate to the project root directory (`inventory-tracking-backend/`).

2. Run the following:
    - `install.sh`: This script will install all the node modules for the frontend and the backend
    - `run.sh`: This script will start the frontend and the backend server
    
The project should now be available at http://localhost:3000.

### Locally (Without Scripts)
Should the scripts not work, run the following commands in order:
- `cd frontend`: Navigate to the `frontend` folder
- `npm install`: Installs all frontend dependencies
- `cd ..`: Navigate back to the root folder
- `cd backend`: Navigate to the `backend` folder
- `npm install`: Installs all backend dependencies

After, open two new terminals:
- In the first terminal: Navigate to the project root directory (`inventory-tracking-backend/`), run `cd backend`, and then run `npm run dev`
- In the second terminal: Navigate to the project root directory (`inventory-tracking-backend/`), run `cd frontend`, and then run `npm start`

The project should now be available at http://localhost:3000.

## Demo
### Create Product
> In this page, you can create a new product.

<img src="https://media.discordapp.net/attachments/484102130286854144/932677460720496640/Product_Creation.PNG">

### View Product
> In this page, you can view all products, redirect to the create new product page by clicking the "Add Product" button, and redirect to the edit product page by clicking the "Edit" button in the table row.

<img src="https://media.discordapp.net/attachments/484102130286854144/932677461035077632/View_Product.PNG?width=1401&height=700">

### Edit Product
> In this page, you can edit an existing product by clicking the edit button.

<img src="https://media.discordapp.net/attachments/484102130286854144/932677458770165790/Edit_product_1.PNG">

<br/>

<img src="https://media.discordapp.net/attachments/484102130286854144/932677459126657054/Edit_product_2.PNG">

### Delete Product
> You can delete a product by clicking the delete button in the table row.

<img src="https://media.discordapp.net/attachments/484102130286854144/932677459353153546/Delete_Product_1.PNG?width=1407&height=701">

<br/>

<img src="https://media.discordapp.net/attachments/484102130286854144/932677459629965313/Delete_Product_2.PNG?width=1416&height=701">

> You can view deleted products by clicking on the "View Deleted Products" toggle.

<img src="https://media.discordapp.net/attachments/484102130286854144/932677459822907503/Delete_Product_3.PNG?width=1416&height=701">

### Export Product Data To CSV
> You can export all products information to a CSV by clicking the "Export to CSV" button.

<img src="https://media.discordapp.net/attachments/484102130286854144/932677460028436490/Export_to_CSV_1.PNG?width=1386&height=700">

<br/>

<img src="https://media.discordapp.net/attachments/484102130286854144/932677460221390879/Export_to_CSV_2.PNG?width=1335&height=700">

<br/>

<img src="https://media.discordapp.net/attachments/484102130286854144/932677460494000158/Export_to_CSV_3.PNG">
