import axios from 'axios';
import ResourceInterface from '../core/entities/Resource';
import ResourceRepository from '../core/repositories/ResourceRepository';
import config from '../config';

const { apiUrl } = config.app;

export default class ResourceDataSource implements ResourceRepository {
  private resources: ResourceInterface[] = [];

  private async getResources(resource: string, page: number): Promise<void> {
    try {
      const response = await axios.get(`${apiUrl}/${resource}/?page=${page}`);
      this.resources = [...this.resources, ...response.data.results];
    } catch (error) {
      throw error;
    }
  }

  public async getAll(resource: string): Promise<ResourceInterface[]> {
    try {
      const response = await axios.get(`${apiUrl}/${resource}/`);

      const totalResources = new Array(response.data.info.pages)
        .fill(0)
        .map((_, i) => this.getResources(resource, i + 1));

      await Promise.all(totalResources);

      return this.resources;
    } catch (error) {
      throw error;
    }
  }
};
