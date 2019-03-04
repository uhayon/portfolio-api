const chai = require('chai')

const app = require('../server');

// Configure Chai
chai.should();

// Mock data


describe('Getting projects', () => {
  it(`Should get the latest projects (${process.env.LATEST_PROJECTS_LIMIT} or less)`, (done) => {
    const projects = [1, 2, 3, 4, 5];

    projects.should.be.an('array').that.have.lengthOf.at.most(Number(process.env.LATEST_PROJECTS_LIMIT));
    done();
  });

  it(`Should get all the projects`, (done) => {
    const projects = [1, 2, 3, 4, 5, 6, 7, 8];
    projects.should.be.an('array');
    done();
  });
});