# API de Games
Esta API é utilizada para estudos
## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parâmetros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.
Exemplos de resposta:
```
[
  {
      "id": 1,
      "title": "Batman Arkham Knight",
      "year": 2015,
      "price": 200,
      "createdAt": "2020-11-10T12:49:58.000Z",
      "updatedAt": "2020-11-10T12:49:58.000Z"
    },
    {
      "id": 2,
      "title": "Novo Jogo",
      "year": 2015,
      "price": 200,
      "createdAt": "2020-11-11T13:56:09.000Z",
      "updatedAt": "2020-11-11T13:56:09.000Z"
    },
    {
      "id": 3,
      "title": "Novo Jogo2",
      "year": 2015,
      "price": 200,
      "createdAt": "2020-11-11T15:57:36.000Z",
      "updatedAt": "2020-11-11T15:57:36.000Z"
    }
]
```
##### Unauthorized! - 401
Caso essa resposta aconteça significa que aconteceu alguma falha durante o processo de autenticação da requisição
Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
  "err": "Invalid Token"
}
```
## Endpoints
### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parâmetros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema

Exemplo:
```
{
	"email": "teste2@hotmail.com",
	"password": "123"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você receberá o token JWT para acessar as rotas protegidas da API 
Exemplos de resposta:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTJAaG90bWFpbC5jb20iLCJpYXQiOjE2MDUyMDU1NDYsImV4cCI6MTYwNTM3ODM0Nn0.J9BccnPKaH7bcVHJdtJmATcZ2bwLZd3xjLK_ZzSKsxY"
}
```

