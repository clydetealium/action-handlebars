const core = require('@actions/core');
const fs = require('fs');
const main = require('../main');

jest.mock('@actions/core');

describe('My Test Suite', () => {
  let setFailedSpy;
  let setOutputSpy;

  beforeEach(() => {
    setFailedSpy = jest.spyOn(core, 'setFailed');
    setOutputSpy = jest.spyOn(core, 'setOutput');
  });

  afterEach(() => {
    setFailedSpy.mockRestore();
    setOutputSpy.mockRestore();
    // Alternatively, you can use mySpy.mockClear() to clear recorded calls
  });

  test('should prefer data path when provided', async () => {
    const compare = fs.readFileSync('./tests/fixtures/data-test.rendered', 'utf-8');

    core.getInput.mockReturnValueOnce('./tests/fixtures/data-test.mustache')
      .mockReturnValueOnce({})
      .mockReturnValueOnce('./tests/fixtures/context.json');

    console.log('eat shit')

    setOutputSpy.mockImplementation(() => {
      console.log('setOutput called');
    });
      
    await main();
    
    expect(setOutputSpy).toHaveBeenCalledWith('rendered-template', compare);
  });

  test('should fail without template path', async () => {
    await main();

    expect(setFailedSpy).toHaveBeenCalledWith('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined');
  });

  test('should generate a rendered tamplate', async () => {
    const data = {
      name: 'John Doe',
      pets: [
        'Licky Minaj',
        'Chairman Meow',
      ], 
      address: {
        city: 'Anytown',
        street: 'Elmwood',
      }
    }
    const compare = fs.readFileSync('./tests/fixtures/data-test.rendered', 'utf-8');

    core.getInput.mockReturnValueOnce('./tests/fixtures/data-test.mustache')
      .mockReturnValueOnce(JSON.stringify(data));

    setOutputSpy.mockImplementation(() => {
      console.log('setOutput called');
    });
      
    await main();
    
    expect(setOutputSpy).toHaveBeenCalledWith('rendered-template', compare);
  });

});
