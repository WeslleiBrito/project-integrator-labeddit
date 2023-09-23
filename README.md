# Documentação da API

## Sumário de Navegação
1. [Resumo](#resumo)
2. [Documentação Postman](#documentação-postaman)
3. [Executando a API](#executando-a-api)
4. [Detalhes do Servidor](#detalhes-do-servidor)
5. [Autenticação](#autenticação)
6. [Endpoints](#endpoints)
    - <a href="#1-signup-post-userssignup">POST /signup</a>
    - <a href="#2-login-post-userslogin">POST /login</a>
    - <a href="#3-create-post-post-posts">POST /create-post</a>
    - <a href="#4-edit-post-put-postsid">PUT /edit-post</a>
    - <a href="#5-delete-post-delete-postsid">DELETE /delete-post</a>
    - <a href="#6-like-or-dislike-post-post-postsidlike">POST /like-dislike-posts</a>
    - <a href="#7-like-or-dislike-comment-post-commentsidlike">POST /get-posts-comments</a>
    - <a href="#8-get-post-get-posts">GET /get-posts</a>
7. [Pessoas autoras](#pessoas-autoras)
8. [Contatos](#contatos)

## Resumo
Bem-vindo à documentação da API do Labook! A API labook-backend foi projetada para fornecer um ambiente de comunicação com um banco de dados por meio de seus endpoints exclusivos. Inspirada no conceito de rede social, esta API permite que qualquer pessoa se cadastre, crie posts e interaja com as publicações de outros usuários de forma intuitiva e segura.


---
## Documentação Postaman :small_red_triangle:
- #### [Link](https://documenter.getpostman.com/view/26586405/2s9Y5YR2Tz)
## Executando a API

Aqui está um guia passo a passo para executar a API do projeto Labook:

### 1. Clonando o Repositório

Clone este repositório para o seu ambiente local:

```bash
# Clone este repositório
$ git clone https://github.com/WeslleiBrito/projeto-labook-backend.git
```

### 2. Configurando o Arquivo .env

1. Na raiz do projeto (`project-integrator-labeddit/`), crie um arquivo chamado `.env`.
2. Abra o arquivo `env.exemplo` que está na raiz do projeto e copie todas as variáveis de ambiente.
3. Cole as variáveis de ambiente no arquivo `.env` que você criou.
4. Configure a variável `JWT_KEY` com uma senha forte para encriptação de tokens.

### 3. Criação e Configuração do Banco de Dados

1. Dentro da pasta `project-integrator-labeddit/src/database`, crie um arquivo chamado `database.db` se ele ainda não existir.
2. Conecte-se ao banco de dados. É recomendado o uso da extensão MySQL da Weijan Chen para esta etapa.
3. No arquivo `database.sql`, você encontrará todas as queries de criação das tabelas necessárias. Execute todas elas no seu banco de dados.

### 4. Instalando Dependências e Iniciando a API

1. Abra um terminal e navegue até a pasta do projeto (`project-integrator-labeddit/`).
2. Instale as dependências necessárias executando o seguinte comando:

```bash
# Instalação das dependências
$ npm install
```

3. Inicie a aplicação usando o seguinte comando:

```bash
# Executando a aplicação
$ npm run dev
```

Agora, a API do Labeddit está em execução e você pode acessar os endpoints através da URL base `http://localhost:3003`.

Certifique-se de seguir cada etapa cuidadosamente para garantir o correto funcionamento da API. Se você encontrar algum problema ou tiver dúvidas, sinta-se à vontade para buscar ajuda na equipe de suporte.

---

## Detalhes do Servidor

- **URL Base**: `http://localhost:3003`

---

## Autenticação

Antes de acessar os endpoints protegidos, você deve estar autenticado. Para fazer isso, primeiro você precisa criar uma conta usando o endpoint `signup` e, em seguida, usar suas credenciais para fazer login através do endpoint `login`. Isso fornecerá um token de autenticação que você deve incluir nos cabeçalhos de solicitação das operações protegidas.

---

## Endpoints

### 1. Signup: `[POST] /users/signup`

Cria uma nova conta de usuário.

__*Observação: Todos os usuários criados possuem os privilégios de um usuário padrão(normal), o que lhes permite criar postagens, visualizar as postagens de outros usuários, comentar e interagir ao dar likes ou dislikes.*__

**Corpo da Solicitação [body]:**
Input:
```json
{
  "name": "seu-nome",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```
Output: 
```Json
{
  "token": "um token jwt"
}
```
### 2. Login: `[POST] /users/login`

Realiza o login e recebe um token de autenticação.

**Corpo da Solicitação [body]:**

Input:
```json
{
  "email": "email@exemplo.com",
  "password": "senha123"
}
```
Output:
```Json
{
  "token": "um token jwt"
}
```

### 3. Create post: `[POST] /posts`

Cria um novo post.

**Cabeçalhos [headers]:**
- `headers.authorization = "token jwt"`

**Corpo da Solicitação [body]:**
Input:
```json
{
  "content": "Conteúdo do Post"
}
```
Output:
```Json
{
  "message": "Post criado com sucesso!"
}
```
### 4. Edit post: `[PUT] /posts/:id`

Edita um post existente.

__*Observação: Apenas o proprietário do post consegue fazer edição do conteúdo.*__

**Cabeçalhos [headers]:**
- `headers.authorization = "token jwt"`

**Parâmetros [params]:**
- `params.id = "id"`

**Corpo da Solicitação [body]:**
Input:
```json
{
  "content": "Novo Conteúdo do Post"
}
```
Output:
```Json
{
  "message": "Post editado com sucesso!"
}
```
### 5. Delete post: `[DELETE] /posts/:id`

Exclui um post existente.

__*Observação: Apenas o proprietário ou usuário admin ou master podem deletar um post.*__

Input:
Cabeçalhos [headers]
- `headers.authorization = "token jwt"`

Parâmetros [params]
- `params.id = "id"`

Output:
```json
{
  "message": "Post deletado com sucesso!"
}
```

### 6. Like or dislike [Post]: `[POST] /posts/:id/like`

Curtir ou descurtir uma postagem.

__*Observações:*__

__*Curtir = `true`, descurtir = `false`.*__
__*Quem criou o post não pode dar like ou dislike no mesmo.*__
__*Caso dê um like em um post que já tenha dado like, o like é desfeito.*__
__*Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.*__
__*Caso dê um like em um post que tenha dado dislike, o like sobrescreve o*__ __*dislike.*__
__*Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.*__

**Cabeçalhos [headers]:**
- `headers.authorization = "token jwt"`

**Parâmetros [params]**
- `params.id = "id"`

**Corpo da Solicitação [body]:**
Input:
```json
{
  "like": true
}
```
Ou:
```json
{
    "like": false
}
```
---
Output:
```json
{
  "message": "Like criado com sucesso."
}
```
Ou:
```json
{
  "message": "Dislike criado com sucesso."
}
```
### 7. Like or dislike [Comment]: `[POST] /comments/:id/like`

Curtir ou descurtir uma postagem.

__*Observações:*__

__*Curtir = `true`, descurtir = `false`.*__
__*Quem criou o comentário não pode dar like ou dislike no mesmo.*__
__*Caso dê um like em um comentário que já tenha dado like, o like é desfeito.*__
__*Caso dê um dislike em um comentário que já tenha dado dislike, o dislike é desfeito.*__
__*Caso dê um like em um comentário que tenha dado dislike, o like sobrescreve o*__ __*dislike.*__
__*Caso dê um dislike em um comentário que tenha dado like, o dislike sobrescreve o like.*__

**Cabeçalhos [headers]:**
- `headers.authorization = "token jwt"`

**Parâmetros [params]**
- `params.id = "id"`

**Corpo da Solicitação [body]:**
Input:
```json
{
  "like": true
}
```
Ou:
```json
{
    "like": false
}
```
---
Output:
```json
{
  "message": "Like criado com sucesso."
}
```
Ou:
```json
{
  "message": "Dislike criado com sucesso."
}
```
### 8. Get Post: `[Get] /posts`

Devolve todos os post existentes.
__*Observação: Um post é retornado com todos os comentários relacionado ele e os comentários dos comentários que pertensão ao post.*__
**Cabeçalhos [headers]:**
- headers.authorization = "token jwt"

Output: 
```

[
    {
        "id": "f3d1cb67-50f5-4d64-9189-44b3fb70f29f",
        "content": "Meu primeiro post",
        "creator": {
            "id": "89d20ab2-ec11-4e78-916c-b3bd8a994184",
            "name": "Wesllei Brito"
        },
        "like": 0,
        "dislike": 0,
        "amountComments": 2,
        "createdAt": "2023-09-09 00:28:51",
        "updatedAt": "2023-09-09 00:28:51",
        "comments": [
            {
                "id": "be142b73-2e90-49ed-83d1-190346d8eb7f",
                "idUser": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
                "postId": "f3d1cb67-50f5-4d64-9189-44b3fb70f29f",
                "parentCommentId": null,
                "content": "Primeiro usuário a comentar o primeiro post.",
                "createdAt": "2023-09-14 23:06:40",
                "updatedAt": "2023-09-14 23:06:40",
                "like": 0,
                "dislike": 0,
                "amountComment": 2,
                "answers": [
                    {
                        "id": "08a1eae5-42c1-4342-9411-f02b8b95270b",
                        "idUser": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
                        "postId": "93da92d9-d907-4d7a-8c06-0fd869587520",
                        "parentCommentId": "be142b73-2e90-49ed-83d1-190346d8eb7f",
                        "content": "Comentário em relação ao primeiro comentário",
                        "createdAt": "2023-09-15 22:49:08",
                        "updatedAt": "2023-09-15 22:49:08",
                        "like": 0,
                        "dislike": 0,
                        "amountComment": 1,
                        "answers": [
                            {
                                "id": "1aceab01-10a4-4676-822d-9b8b4ac262f1",
                                "idUser": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
                                "postId": "93da92d9-d907-4d7a-8c06-0fd869587520",
                                "parentCommentId": "08a1eae5-42c1-4342-9411-f02b8b95270b",
                                "content": "Comentando o comentário 3",
                                "createdAt": "2023-09-15 22:53:02",
                                "updatedAt": "2023-09-15 22:53:02",
                                "like": 0,
                                "dislike": 0,
                                "amountComment": 1,
                                "answers": [
                                    {
                                        "id": "6bc13392-3c94-4b29-b582-b1cc6181865a",
                                        "idUser": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
                                        "postId": "93da92d9-d907-4d7a-8c06-0fd869587520",
                                        "parentCommentId": "1aceab01-10a4-4676-822d-9b8b4ac262f1",
                                        "content": "Comentário aleatório",
                                        "createdAt": "2023-09-16 19:41:46",
                                        "updatedAt": "2023-09-16 19:41:46",
                                        "like": 0,
                                        "dislike": 0,
                                        "amountComment": 0,
                                        "answers": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "78f3a39f-8f25-48fa-ada9-27f2f2f91b2d",
                        "idUser": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
                        "postId": "93da92d9-d907-4d7a-8c06-0fd869587520",
                        "parentCommentId": "be142b73-2e90-49ed-83d1-190346d8eb7f",
                        "content": "Comentando o comentário 1",
                        "createdAt": "2023-09-15 22:53:41",
                        "updatedAt": "2023-09-15 22:53:41",
                        "like": 0,
                        "dislike": 1,
                        "amountComment": 0,
                        "answers": []
                    }
                ]
            },
            {
                "id": "fabcafd3-9812-416b-8bed-a08393f8971c",
                "idUser": "fd63e022-efdf-4310-90c6-0c533c31a51a",
                "postId": "f3d1cb67-50f5-4d64-9189-44b3fb70f29f",
                "parentCommentId": null,
                "content": "Comentário a ser deletado para teste",
                "createdAt": "2023-09-15 00:32:57",
                "updatedAt": "2023-09-15 00:32:57",
                "like": 0,
                "dislike": 0,
                "amountComment": 0,
                "answers": []
            }
        ]
    },
    {
        "id": "86f0406d-4bad-4183-911c-207954502d6e",
        "content": "Post do super master",
        "creator": {
            "id": "89d20ab2-ec11-4e78-916c-b3bd8a994184",
            "name": "Wesllei Brito"
        },
        "like": 0,
        "dislike": 0,
        "amountComments": 0,
        "createdAt": "2023-09-09 19:05:03",
        "updatedAt": "2023-09-09 19:05:03",
        "comments": []
    },
    {
        "id": "6bffee3b-b1de-45e7-9390-96daecc37f96",
        "content": "Post do normal 07",
        "creator": {
            "id": "e972ae21-1992-4c56-987c-b7a5398cf27f",
            "name": "Normal 07"
        },
        "like": 1,
        "dislike": 0,
        "amountComments": 0,
        "createdAt": "2023-09-10 14:05:03",
        "updatedAt": "2023-09-10 14:05:03",
        "comments": []
    },
    {
        "id": "93da92d9-d907-4d7a-8c06-0fd869587520",
        "content": "Post do admin 01",
        "creator": {
            "id": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
            "name": "Normal 07"
        },
        "like": 0,
        "dislike": 0,
        "amountComments": 2,
        "createdAt": "2023-09-10 14:06:04",
        "updatedAt": "2023-09-10 14:06:04",
        "comments": [
            {
                "id": "f0da35a0-a694-4eb4-8eb3-2c28e9c3a0b9",
                "idUser": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
                "postId": "93da92d9-d907-4d7a-8c06-0fd869587520",
                "parentCommentId": null,
                "content": "Comentário aleatório",
                "createdAt": "2023-09-15 22:54:10",
                "updatedAt": "2023-09-15 22:54:10",
                "like": 0,
                "dislike": 0,
                "amountComment": 0,
                "answers": []
            },
            {
                "id": "117f3272-ff9a-491c-a000-8dcf781d64ad",
                "idUser": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
                "postId": "93da92d9-d907-4d7a-8c06-0fd869587520",
                "parentCommentId": null,
                "content": "Comentário aleatório",
                "createdAt": "2023-09-17 13:54:59",
                "updatedAt": "2023-09-17 13:54:59",
                "like": 0,
                "dislike": 0,
                "amountComment": 0,
                "answers": []
            }
        ]
    },
    {
        "id": "f1d16129-228c-471d-a928-36c46fb0efe6",
        "content": "Sgundo ou terceiro post para estudo",
        "creator": {
            "id": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
            "name": "Normal 07"
        },
        "like": 0,
        "dislike": 0,
        "amountComments": 0,
        "createdAt": "2023-09-15 22:41:55",
        "updatedAt": "2023-09-15 22:41:55",
        "comments": []
    },
    {
        "id": "ac16ec89-bb2e-4212-9494-9dcd054b299e",
        "content": "Meu teste de post é este",
        "creator": {
            "id": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
            "name": "Normal 07"
        },
        "like": 0,
        "dislike": 0,
        "amountComments": 0,
        "createdAt": "2023-09-15 22:42:26",
        "updatedAt": "2023-09-15 22:42:26",
        "comments": []
    },
    {
        "id": "4ff96a37-9a51-44c0-856b-e8f73b1c2d61",
        "content": "Meu teste de post é este",
        "creator": {
            "id": "66abe445-ad6d-4a2f-ac54-51a4b45f62bf",
            "name": "Normal 07"
        },
        "like": 0,
        "dislike": 0,
        "amountComments": 0,
        "createdAt": "2023-09-16 23:27:44",
        "updatedAt": "2023-09-16 23:27:44",
        "comments": []
    }
]
```

## Pessoas Autoras
![foto](./src/assets/photos/foto.png)
```
```
## Contatos
[Linkedin](https://www.linkedin.com/in/wesllei-brito-9222b9202/)

Isso conclui a documentação da API. Se você tiver alguma dúvida ou problema, sinta-se à vontade para entrar em contato com nossa equipe de suporte.