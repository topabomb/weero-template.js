import { existsSync, rmSync } from "fs";

const deleteDirSync = async (path: string, timeout: number = 1000) => {
  const proc = () => {
    if (existsSync(path))
      do {
        try {
          rmSync(path, {
            recursive: true,
          });
        } catch (err) {
          continue;
        }
      } while (existsSync(path));
  };
  return new Promise((resolve, reason) => {
    let success = false;
    setTimeout(() => {
      proc();
      success = true;
      resolve(true);
    });
    setTimeout(() => {
      if (!success) reason(false);
      else resolve(true);
    }, timeout);
  });
};

export { deleteDirSync };
