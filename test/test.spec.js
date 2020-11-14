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
                res.body.should.be.a('object')
                done()
            })
    })
})

// describe("Teste POST game", () => {
//     it("deve criar um novo jogo", (done) => {

//         let game = {
//             title: "Jogo criado pelo mocha",
//             year: 2020,
//             price: 178
//         }
//         chai.request('localhost:3033')
//             .post('/game')
//             .send(game)
//             .end((err, res) => {
//                 if (err) {
//                     console.log(err)
//                     done(err)
//                 }
//                 res.should.have.status(201)

//                 done()
//             })
//     })
// })

describe('/GET/:id game', () => {
    it('GET one game by id', (done) => {
        let id = 2;
        chai.request('localhost:3033')
            .get('/games/' + id)
            .end((err, res) => {
                if(err) {
                    console.log(err)
                    done(err)
                }
                res.should.have.status(200)
                res.body.should.have.property('id').eql(id);
                res.body.should.be.a('object')
                done();
            })
    })
})

describe('/delete/:id game', () => {
    it('Delete one game by id', (done) => {
        let id = 8;
        chai.request('localhost:3033')
            .delete('/game/' + id)
            .end((err, res) => {
                if(err) {
                    console.log(err)
                    done(err)
                }
                res.should.have.status(200)
                done();
            })
    })
})


