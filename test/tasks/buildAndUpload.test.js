const expect = require("chai").expect;
const fs = require("fs");
const { rmSafe, shellSafe } = require("../shellSafe");
const yaml = require("js-yaml");
const buildAndUpload = require("../../src/tasks/buildAndUpload");

// This test will create the following fake files
// ./dappnode_package.json  => fake manifest
// ./dnp_0.0.0/             => build directory
//
// Then it will expect the function to generate transaction data
// and output it to the console and to ./dnp_0.0.0/deploy.txt

describe("buildAndUpload", () => {
  const ensName = "sdk-test.dnp.dappnode.eth";
  const version = "0.1.0";
  const imageTag = `${ensName}:${version}`;
  const manifest = {
    name: ensName,
    version,
    image: {}
  };
  const manifestPath = "./dappnode_package.json";
  const composePath = "./docker-compose.yml";
  const buildDir = `./build_${version}/`;

  /**
   * [NOTE] using an extremely lightweight image to accelerate tests
   */
  const Dockerfile = `
FROM hello-world
ENV test=1
`.trim();

  const compose = {
    version: "3.4",
    services: {
      [ensName]: {
        image: imageTag,
        build: "./build"
      }
    }
  };

  before(async () => {
    await rmSafe(manifestPath);
    await rmSafe(composePath);
    await rmSafe("./build");
    await rmSafe(buildDir);
    fs.mkdirSync("./build");
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    fs.writeFileSync(composePath, yaml.dump(compose, { indent: 2 }));
    fs.writeFileSync("./build/Dockerfile", Dockerfile);
  });

  it("Should build and upload the current version", async () => {
    const buildAndUploadTasks = buildAndUpload({
      buildDir,
      ipfsProvider: "infura",
      verbose: true
    });
    const { manifestIpfsPath } = await buildAndUploadTasks.run();
    // Check returned hash is correct
    expect(manifestIpfsPath).to.include("/ipfs/Qm");
    // Check that the deploy.txt file is correct
    // const deployText = fs.readFileSync(deployTextPath, 'utf8');
    // expect(deployText).to.include(expectedString);
  }).timeout(60 * 1000);

  after(async () => {
    await rmSafe(manifestPath);
    await rmSafe(composePath);
    await rmSafe("./build");
    await rmSafe(buildDir);
    await shellSafe(`docker image rm -f ${imageTag}`);
  });
});
