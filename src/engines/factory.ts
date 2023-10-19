import { IEngine } from "../libs/engineTypes";
const instanceOf = async (name: string) => {
  switch (name) {
    case "node-consoleapp-simple":
      return (await import(`./node-consoleapp-simple`)).default as IEngine;
  }
};
export { instanceOf };
