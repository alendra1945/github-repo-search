export const testId = (id: string) =>
  import.meta.env.DEV ? { "data-testid": id } : {};
