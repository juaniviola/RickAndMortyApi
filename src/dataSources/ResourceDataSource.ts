import axios from 'axios';
import ResourceInterface from '../core/entities/Resource';
import ResourceRepository from '../core/repositories/ResourceRepository';
import config from '../config';
import CacheRepository from '../core/repositories/ChacheRepository';

const { apiUrl } = config.app;

export default class ResourceDataSource implements ResourceRepository {
  private cacheRepository: CacheRepository;
  private resources: ResourceInterface[] = [];

  constructor(cacheRepository: CacheRepository) {
    this.cacheRepository = cacheRepository;
  }

  public async getAll(resource: string): Promise<ResourceInterface[]> {
    try {
      const response = await axios.get(`${apiUrl}/${resource}/`);

      const totalResources = new Array(response.data.info.count)
        .fill(0)
        .map((_, i) => i + 1)
        .join(',');

      const dataFromCache = await this.cacheRepository.get(`${resource}/${totalResources}`);
      if (dataFromCache) {
        return dataFromCache;
      }

      await this.getResources(totalResources, resource);

      const { resources } = this;
      await this.cacheRepository.set(`${resource}/${totalResources}`, resources);

      return resources;
    } catch (error) {
      throw error;
    }
  }

  private async getResources(resources: string, resource: string): Promise<void> {
    try {
      const response = await axios.get(`${apiUrl}/${resource}/${resources}`);
      this.resources = [...response.data];
    } catch (error) {
      throw error;
    }
  }
};
