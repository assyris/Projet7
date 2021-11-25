* Il vous faudra avoir installé sur votre machine:
    * Node.js (et donc npm),
    * MySQL,
    * Git.

- Créer un dossier vide et cloner ce repository à l'intérieur:


git clone https://github.com/assyris/Projet7.git


## DANS LE DOSSIER CLIENT

- Ouvrez un premier terminal et faites cd backend/client puis:
 
npm install

- et une fois l'installation terminée:

npm start

## MySQL

- Ouvrez votre terminal mysql.

- Connectez-vous.

- Importez le fichier " groupomania.sql "

mysql> source (chemin vers le fichier groupomania.sql)

Ceci va créer une base de données nommée "groupomania"

## DANS LE DOSSIER BACKEND

- allez dans "config/db.config.js" et renseigner le PASSWORD.

- Ouvrez un autre terminal (assurez vous de bien être dans le dossier backend)

- Puis faites:

npm install

- puis une fois l'installation terminée:

nodemon server
