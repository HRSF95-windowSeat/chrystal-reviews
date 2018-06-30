var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

const port = process.env.port || 8081;

describe('CRUD Testing', function(){

  it('GET should return status 200', function(done) {
    chai.request(`http://127.0.0.1:${port}`)
      .get('/restaurant/2001/reviews')
      .end( (err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should post a review to the database', function(done) {
    chai.request(`http://127.0.0.1:${port}`)
        .post('/restaurant/post/reviews')
        .send({
          id: '6c3f9ce6-b16b-4b0a-89e7-2c416e35fdd8',
          restaurant_id: 90000000,
          username: 'Dr. Angry Man',
          date: '2018-07-01',
          overall_rating: 1,
          food_rating: 1,
          service_rating: 1,
          ambiance_rating: 1,
          value_rating: 1,
          noise_level: 5,
          recommended: 1,
          body: 'I am Dr. Angry Man! I am angry! I am a man! And I am not gonna take this anymore! It is my right as a man, and as a doctor, not to have to take this!'
        })
        .end((err, res) => {
          chai.request(`http://127.0.0.1:${port}`)
          .get('/restaurant/90000000/reviews')
          .end( (err, res) => {
            expect(res.body[0].restaurant_id).to.equal(90000000);
            done();
          });
        });
  });

  it('should delete a review from the database', function(done) {
    chai.request(`http://127.0.0.1:${port}`)
        .delete('/restaurant/90000000/reviews')
        .end((err,res) => {
          done();
        });
  });

});
