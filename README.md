## DEPENDECIAS ADICIONALES PARA EL BACKEND

## Ejecutar los comandos:
# descargar composer:
# WINDOWS:
https://getcomposer.org/download/

# LINUX:
cd ~

curl -sS https://getcomposer.org/installer -o composer-setup.php

php -r "if (hash_file('SHA384', 'composer-setup.php') === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

composer --version

## DEPENDECNIAS PARA EL FRONTEND

# en terminal poner estos comandos:
# Linux
sudo apt update
sudo apt install nodejs npm

# Windows
descargar de este link: https://nodejs.org/en

# Luego en terminal:
npm i  ,
npm init -y  ,
npm install react-scripts --save

### SI ME OLVIDE ALGUNAS DEPENDENCIAS DEL BACKEND PONER LOS ERRORES AL CHAT GPT O INFORMARLO EN EL GRUPO O AL PRIVADO POR WHATSAPP :V
