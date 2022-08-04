import ResourceInterface from '../entities/Resource';

export default interface ResourceRepository {
  getAll(resource: string): Promise<ResourceInterface[]>;
};
