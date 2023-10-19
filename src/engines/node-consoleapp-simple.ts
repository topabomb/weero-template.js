import { IEngine } from "../libs/engineTypes";
import { deleteDirSync } from "../libs/fs";
import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync } from "fs";
import fsPath from "path";
import { simpleGit, CleanOptions } from "simple-git";
import * as rra from "recursive-readdir-async";
import json5 from "json5";
const engine: IEngine = {
  execute: async (name: string, path: string, url?: string) => {
    return new Promise((resolve, reject) => {
      const clonePath = fsPath.join(path, "__templates");
      mkdirSync(path);
      mkdirSync(clonePath);
      const uri = url
        ? url
        : "https://github.com/topabomb/console-craft-example";
      simpleGit().clone(uri, clonePath, {}, async (err) => {
        if (!err) {
          const files = await rra.list(clonePath, {
            recursive: true,
            exclude: [".git"],
          });
          for (const item of files) {
            let targetPath = (item.path as string).substring(clonePath.length);
            if (!targetPath.startsWith("/")) targetPath = `/${targetPath}`;
            const filePath = fsPath.join(
              fsPath.resolve(`${path}${targetPath}`),
              `${item.name}`
            );
            cpSync(item.fullname, filePath);
          }
          const jsonPath = fsPath.resolve(`${path}/package.json`);
          if (existsSync(jsonPath)) {
            const content = json5.parse(
              readFileSync(jsonPath, { encoding: "utf8" })
            );
            content.name = name;
            content.version = "1.0.0";
            writeFileSync(jsonPath, JSON.stringify(content, undefined, 4), {
              encoding: "utf8",
            });
          }
          await deleteDirSync(clonePath);
          resolve();
        } else {
          reject(new Error(`clone from ${uri} error:${err}`));
        }
      });
    });
  },
};
export default engine;
