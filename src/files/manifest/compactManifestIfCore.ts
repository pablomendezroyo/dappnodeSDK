import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { releaseFiles } from "../../params";
import { SetupWizard } from "../setupWizard/types";
import { readManifest } from "./readManifest";
import { writeManifest } from "./writeManifest";

/**
 * Reads manifest and extra files in `buildDir` compacts them in the manifest
 * and writes the resulting manifest in `buildDir`
 * @param buildDir `build_0.1.0`
 */
export function compactManifestIfCore(buildDir: string): void {
  const { manifest, format } = readManifest({ dir: buildDir });

  if (manifest.type !== "dncore") return;

  const setupWizard = readSetupWizardIfExists(buildDir);
  if (setupWizard) {
    manifest.setupWizard = setupWizard;
  }

  writeManifest(manifest, format, { dir: buildDir });
}

// Utils

function readSetupWizardIfExists(buildDir: string): SetupWizard | null {
  const files = fs.readdirSync(buildDir);
  const setupWizardFile = files.find(file =>
    releaseFiles.setupWizard.regex.test(file)
  );
  if (!setupWizardFile) return null;
  const setupWizardPath = path.join(buildDir, setupWizardFile);
  return yaml.load(fs.readFileSync(setupWizardPath, "utf8"));
}
