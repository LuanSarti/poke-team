# poke-team

## Descrição

Esta é uma aplicação fullstack, para criar e gerenciar times de pokémon.

## Recursos

--Registro de usuários
--Login de usuários com Bearer token como autenticação
--Listagem com paginação dos pokémons
--Listagem de times de pokémons
--Criação de times
--Atualização de times
--Exclusão de times

## Instalação

1. Clone este repositório utlizando HTTPS `git clone https://github.com/LuanSarti/poke-team.git` ou SSH `git clone git@github.com:LuanSarti/poke-team.git`
2. Entre na pasta mestre `cd poke-team`

### Na pasta da api

1. Entre na pasta poke-team-api rodando no terminal `cd poke-team-api`
2. Instale as dependencias `composer install`
3. Crie o arquivo de váriaveis de ambiente `.env` utilizando o `.env.example` como base
4. Configure no arquivo `.env` as suas informações de banco de dados
5. Gere uma chave JWT com o comando `php artisan jwt:secret`
6. Crie o banco de dados e as tableas com o comando `php artisan migrate`
   --Caso não exista o banco de dados no seu servidor, o artisan vai perguntar se ele pode criar, basta confirmar
7. Inicie o servidor local com o comando `php artisan serve`

### Na pasta da web

1. Em outro terminal entre na pasta poke-tem-web com o comando `cd poke-team-web`
2. Instale as dependencias `npm i`
3. Crie um arquivo de váriaveis de ambiente `.env.local` na raiz da pasta `poke-team-web`, nele adicione a váriavel `NEXT_PUBLIC_API_BASE_ROUTE` com a rota `http://{laravelServer}/api/`
   --No terminal que foi iniciado o servidor local da api está registrado o domínio que precisa ser colocado no lugar das chaves
4. Inicie o servidor local com o comando `npm run dev`
5. No navegador acesse o local que foi iniciado o servidor local registrado no terminal
