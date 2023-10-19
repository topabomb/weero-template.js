import { cli, inquirer } from "console-craft";
import { resolve } from "path";
import { existsSync, rmSync } from "fs";
import { instanceOf } from "./engines/factory";
const commands = [
  {
    name: "simple_console_project",
    description: "create simple console project",
    args: [
      { flags: "--dir <dir>", default: process.cwd },
      { flags: "--name <name>", default: "simple_console_project" },
      {
        flags: "--url <url>",
        default: "https://github.com/topabomb/console-craft-example",
      },
    ],
  },
];
cli.initialize(commands, {
  author: "topabomb(hualei.hb@gmail.com)",
  description: "node console app.",
});
cli.command("simple_console_project", async ({ name, args, logger }) => {
  const path = resolve(`${resolve(args["dir"])}/${args["name"]}`);
  let doContinue = true;
  if (existsSync(path)) {
    logger.warn(`${path} exists.`);
    const confirm = await inquirer.prompt({
      type: "confirm",
      name: "delete",
      message: `delete directory(${path}) to continue operation?`,
      default: false,
    });
    if (confirm.delete) rmSync(path, { recursive: true });
    else doContinue = false;
  }
  if (doContinue && !existsSync(path)) {
    (await instanceOf("node-consoleapp-simple")).execute(
      args["name"],
      path,
      args["url"]
    );
    logger.info(`project(${args["name"]}),path(${path}) created.`);
  }
});
void cli.run();
