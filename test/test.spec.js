let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp)

describe("Teste GET games", () => {
    it("deve receber os jogos da api", (done) => {
        chai.request('localhost:3033')
        .get('/games')
        .end((err, res) => {
            res.should.status(200);
            res.body.should.be.a('array')
            done()
        })
    })
})

describe("Teste POST game", () => {
    it("deve criar um novo jogo"), (done) => {
        
        let game = {
            title: "Jogo criado pelo moca",
            year: 2020,
            price: 178
        }
        chai.request('localhost:3033')
        .post('/game')
        .send(game)
        .end((err, res) => {
            res.should.have.status(201)
            done()
        })
    }
})