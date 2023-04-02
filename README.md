# Blog

Greentopia Blog is a web application built using React.js and is styled using css only that allows users to create, edit, and delete post. The blog is mainly concerned with activities to save environment.


# Features
1. User can only login by pervious registerd account.
2. Discover activities through blog page without login.
3. Add post while only login. User cannot add post without login.
4. Enable user to edit or delete his/her posts only.
5. user can view the posts he created previously through profile page appeared as an avatar in the navbar.


# Technologies
1. React.js
2. Json-server auth
3- Json-server uploader
4. Axios
5. React Router
6. Pure CSS


# Usage
- Once the application is running, you can see all posts in the blog page.

- If you try to add post without login, a pop up message will appear to make you login first.

- Once the application is running, you can create a new user account by clicking on the "Sign Up" if you haven't account. After registering and logging in, you can create new activity post by clicking on the "+" button on the Blog age.

- You can see all posts in Blog page, there are two buttons to edit and delete only the posts you have created.

- If you want to see your posts only click on the avatar appeared in navbar.


# Installation
1. Clone the repository 
2. Install dependencies with npm install
3. Start the application with npm run dev and open your browser on this link (http://localhost:5173/).
4. Start the server with (node server.js) on (src path).
5- Run json file with (npx json-server --watch db.json --middlewares ../node_modules/json-server-auth --middlewares ../node_modules/json-server-uploader) on (Data path).
