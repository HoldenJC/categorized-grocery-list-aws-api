import { Example } from './../src/backend-code.js';

describe('Example', function() {

  let example;

  beforeEach(function() {
    example = new Example();
  });

  it('should show an example test', function() {

    expect(example.name).toEqual("Holden");
    console.log(example.name + " compare " + "Holden");

    example.exampleMethod();

    expect(example.name).toEqual("HoldenJC");
    console.log(example.name + " compare " + "HoldenJC");
    
  });
});
