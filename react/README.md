node.js docker container - 'docker run --rm -it -p 3000:3000 -v "/${PWD}:/react" node bash'

start app - cd into app dir and 'npm start'

Development server of create-react-app does not auto refresh - https://stackoverflow.com/questions/43274925/development-server-of-create-react-app-does-not-auto-refresh (create .env and add 'CHOKIDAR_USEPOLLING=true')