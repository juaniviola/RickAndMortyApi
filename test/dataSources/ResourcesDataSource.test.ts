import ResourceInterface from '../../src/core/entities/Resource';
import ResourcesDataSource from '../../src/dataSources/ResourceDataSource';

jest.setTimeout(10000);

describe('ResourcesDataSource', () => {
  it('should return episode resources', async () => {
    const resource = 'episode';
    const quantity = 51;

    const resourcesDataSource = new ResourcesDataSource();
    const response: ResourceInterface[] = await resourcesDataSource.getAll(resource);

    expect(response.length).toBe(quantity);
  });
});
