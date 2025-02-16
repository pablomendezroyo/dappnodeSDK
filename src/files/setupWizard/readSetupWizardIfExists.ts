import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { defaultDir, releaseFiles } from "../../params";
import { SetupWizard } from "./types";
import { readFile } from "../../utils/file";

export function readSetupWizardIfExists(dir?: string): SetupWizard | null {
  const dirPath = dir || defaultDir;
  const setupWizardFileName = fs
    .readdirSync(dirPath)
    .find(file => releaseFiles.setupWizard.regex.test(file));

  if (!setupWizardFileName) return null;
  const data = readFile(path.join(dirPath, setupWizardFileName));

  // Parse setupWizard in try catch block to show a comprehensive error message
  try {
    return yaml.load(data);
  } catch (e) {
    throw Error(`Error parsing setup-wizard: ${e.message}`);
  }
}
