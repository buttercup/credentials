const Credentials = require("../../source/Credentials.js");

describe("Credentials", function() {
    it("instantiates without error", function() {
        expect(() => {
            new Credentials();
        }).to.not.throw();
    });

    it("sets username and password via constructor", function() {
        const creds = new Credentials({ username: "user", password: "pass" });
        expect(creds).to.have.property("username", "user");
        expect(creds).to.have.property("password", "pass");
    });

    it("sets type via constructor", function() {
        const creds = new Credentials({ type: "text" });
        expect(creds).to.have.property("type", "text");
    });

    describe("(static)", function() {
        describe("fromInsecureString", function() {
            it("can be instantiated from a string", function() {
                const creds = Credentials.fromInsecureString(
                    JSON.stringify({
                        type: "test",
                        username: "person",
                        password: "abc123"
                    })
                );
                expect(creds).to.have.property("type", "test");
                expect(creds).to.have.property("username", "person");
                expect(creds).to.have.property("password", "abc123");
            });
        });

        describe("fromPassword", function() {
            it("can be instantiated from a password", function() {
                const creds = Credentials.fromPassword("testing");
                expect(creds).to.be.an.instanceof(Credentials);
                expect(creds).to.have.property("password", "testing");
            });
        });

        describe("fromSecureString", function() {
            beforeEach(function() {
                const creds = new Credentials({
                    type: "test"
                });
                return creds.toSecureString("testing").then(encStr => {
                    this.string = encStr;
                });
            });

            it("can be instantied from a secure string", function() {
                return Credentials.fromSecureString(this.string, "testing").then(creds => {
                    expect(creds).to.be.an.instanceof(Credentials);
                    expect(creds).to.have.property("type", "test");
                });
            });
        });

        describe("isCredentials", function() {
            it("returns correctly for credentials instances", function() {
                expect(new Credentials()).to.satisfy(Credentials.isCredentials);
            });

            it("returns correctly for other items", function() {
                expect({}).to.not.satisfy(Credentials.isCredentials);
            });
        });

        describe("isSecureString", function() {
            beforeEach(function() {
                const creds = new Credentials({ type: "test" });
                return creds.toSecureString("testing").then(encStr => {
                    this.string = encStr;
                });
            });

            it("returns correctly for secure strings", function() {
                expect(this.string).to.satisfy(Credentials.isSecureString);
            });

            it("returns correctly for other strings", function() {
                expect("").to.not.satisfy(Credentials.isSecureString);
                expect("testing").to.not.satisfy(Credentials.isSecureString);
            });
        });
    });
});
