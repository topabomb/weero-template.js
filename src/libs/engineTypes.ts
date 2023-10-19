interface IEngine {
  execute(name: string, path: string, templateUri?: string): Promise<void>;
}
export { IEngine };
