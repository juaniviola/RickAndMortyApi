import ResourceInterface from '../../src/core/entities/Resource';
import ResourcesDataSource from '../../src/dataSources/ResourceDataSource';

// set timeout to 3s as maximum time allowed for the test
jest.setTimeout(65000);

describe('ResourcesDataSource', () => {
  it('should return episode resources', async () => {
    const resource = 'episode';
    const quantity = 51;

    const resourcesDataSource = new ResourcesDataSource();
    const response: ResourceInterface[] = await resourcesDataSource.getAll(resource);

    expect(response.length).toBe(quantity);
  });
});
