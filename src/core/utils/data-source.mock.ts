import { RepositoryMockFactory } from './repository.mock';

export const DataSourceMockFactory = () => ({
  getRepository: jest.fn().mockReturnValue(RepositoryMockFactory()),
});
