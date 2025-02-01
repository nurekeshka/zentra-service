export const ValidationServiceMockFactory = () => ({
  validate: jest.fn().mockResolvedValue({ message: [] }),
});
