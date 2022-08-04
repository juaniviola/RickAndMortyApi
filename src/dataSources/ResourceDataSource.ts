import axios from 'axios';
import ResourceInterface from '../core/entities/Resource';
import ResourceRepository from '../core/repositories/ResourceRepository';
import config from '../config';

const { apiUrl } = config.app;

export default class ResourceDataSource implements ResourceRepository {
  private resources: ResourceInterface[] = [];

  private async getResources(resources: string, resource: string): Promise<void> {
    try {
      const response = await axios.get(`${apiUrl}/${resource}/${resources}`);
      this.resources = [...response.data];
    } catch (error) {
      throw error;
    }
  }

  public async getAll(resource: string): Promise<ResourceInterface[]> {
    try {
      const response = await axios.get(`${apiUrl}/${resource}/`);

      const totalResources = new Array(response.data.info.count)
        .fill(0)
        .map((_, i) => i + 1)
        .join(',');

      await this.getResources(totalResources, resource);

      return this.resources;
    } catch (error) {
      throw error;
    }
  }
};
