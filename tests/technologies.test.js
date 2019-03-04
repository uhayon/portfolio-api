const chai = require('chai')
const expect = chai.expect;

describe('Getting technologies', () => {
  it(`Expect to get all the technologies`, (done) => {
    const technologies = {
      "frontend": [
          "HTML5",
          "React",
          "ASP.NET",
          "CSS3",
          "SASS",
          "LESS"
      ],
      "backend": [
          "NodeJS",
          "Express",
          "NET API"
      ],
      "database": [
          "PostgreSQL",
          "Redis",
          "MongoDB",
          "SQL Server",
          "MySQL"
      ],
      "mobile": [],
      "tool": []
    };

    expect(technologies).to.be.a('object').that.has.all.keys('frontend', 'backend', 'database', 'mobile', 'tool');
    done();
  });
});