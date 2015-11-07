# LFS-Dev-Branch

Hello DEV Team,

Below are steps you need to follow for checking out the project and get yourself up & running in your local.

1) git clonehttps://github.com/meanapp/LFS-Dev-Branch.git

2) After the project is cloned to your local, switch directory to client as cd client.

3) In client directory run the below commands to install all the client dependencies
    
    bower install
    npm install
    
4) After installing the client dependencies, switch directory from client to server as `cd ../server`

5) In server directory run the below command to install all the npm modules.
  
    npm install
  
  
Running tha application

After setting up the project in your local, execute the below command to start yoru application.

1) Open a command prompt to run you local mongo databse like mongod.

  Note: Mongo DB should be installed u=in your local
  
2) Open a different command prompt and navigate to your project directory, and to server directory and run the below command to run your node application

  node server.js
  
  Note: mongo db should be running in your local to start the node server.
  
3) Open a different command prompt and navigate to your project directory, and to client directory and run the below command to start the application.

  grunt serve
  
  Note: grunt should be installed to run the above command, to install grunt in you windows machine please click on the below to help you install it.
  
  http://gruntjs.com/getting-started
  
