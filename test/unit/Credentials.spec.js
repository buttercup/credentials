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

    describe("getID", function() {
        it("should return a hash of this.data", function() {
            const creds = new Credentials({
                type: "text",
                username: "bob",
                password: "mypass123",
                fake_value: "somevalue"
            });
            expect(creds.getID()).to.equal(
                "23889bee8b6f8a8923d0cc5e3daeffec54d79b5b50b251c307520a56ab875f58"
            );
        });

        it("should return unique hashes", function() {
            const creds1 = Credentials.fromPassword("test1");
            const creds2 = Credentials.fromPassword("test2");
            expect(creds1.getID()).to.not.equal(creds2.getID());
        });

        it("should return the same value for multiple calls", function() {
            const creds1 = Credentials.fromPassword("test1");
            expect(creds1.getID()).to.equal(
                "f90d99fd357cbfd6f33dff57c2445aa0c2714507825c7874625616f23a296157"
            );
            expect(creds1.getID()).to.equal(
                "f90d99fd357cbfd6f33dff57c2445aa0c2714507825c7874625616f23a296157"
            );
        });
    });

    describe("getValue", function() {
        it("gets a value", function() {
            const creds = new Credentials({ type: "text", misc: 123 });
            expect(creds.getValue("type")).to.equal("text");
            expect(creds.getValue("misc")).to.equal(123);
        });

        it("returns undefined if value doesn't exist", function() {
            const creds = new Credentials();
            expect(creds.getValue("misc")).to.be.undefined;
            expect(creds.getValue("username")).to.be.undefined;
        });

        it("returns empty string if type isn't provided", function() {
            const creds = new Credentials();
            expect(creds.getValue("type")).to.equal("");
        });
    });

    describe("getValueOrFail", function() {
        it("returns values that exist", function() {
            const creds = new Credentials({ type: "text", misc: 123 });
            expect(creds.getValueOrFail("type")).to.equal("text");
            expect(creds.getValueOrFail("misc")).to.equal(123);
        });

        it("throws for values that do not exist", function() {
            const creds = new Credentials();
            expect(() => {
                creds.getValueOrFail("nothere");
            }).to.throw(/Failed.+required.+property/i);
        });
    });

    describe("setValue", function() {
        it("sets values", function() {
            const creds = new Credentials();
            creds.setValue("username", "alice");
            expect(creds.username).to.equal("alice");
        });

        it("returns instance", function() {
            const creds = new Credentials();
            const out = creds.setValue("username", "alice");
            expect(out).to.equal(creds);
        });
    });

    describe("toInsecureString", function() {
        it("outputs a JSON string", function() {
            const creds = new Credentials({ type: "text" });
            const str = creds.toInsecureString();
            expect(JSON.parse(str)).to.deep.equal({
                type: "text"
            });
        });
    });

    describe("toSecureString", function() {
        it("outputs an encrypted string", function() {
            const creds = new Credentials({ type: "text", username: "bob", password: "mypass123" });
            return creds.toSecureString("testing").then(str => {
                expect(str).to.not.include("text");
                expect(str).to.not.include("bob");
                expect(str).to.not.include("mypass123");
            });
        });
    });
});
