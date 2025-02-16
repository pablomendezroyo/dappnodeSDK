import { ComposeService } from "./types";

export const params = {
  CONTAINER_NAME_PREFIX: "DAppNodePackage-",
  CONTAINER_CORE_NAME_PREFIX: "DAppNodeCore-",
  CONTAINER_TOOL_NAME_PREFIX: "DAppNodeTool-",
  DOCKER_WHITELIST_NETWORKS: ["dncore_network", "dnpublic_network"],
  DOCKER_WHITELIST_BIND_VOLUMES: [
    "dappmanager.dnp.dappnode.eth",
    "wifi.dnp.dappnode.eth",
    "vpn.dnp.dappnode.eth",
    "wireguard.dnp.dappnode.eth",
    "core.dnp.dappnode.eth",
    "dappnode-exporter.dnp.dappnode.eth"
  ],
  DOCKER_CORE_ALIASES: [
    "dappmanager.dappnode",
    "wifi.dappnode",
    "vpn.dappnode",
    "wireguard.dappnode",
    "ipfs.dappnode",
    "bind.dappnode"
  ],
  DNS_SERVICE: "172.33.1.2",
  MINIMUM_COMPOSE_FILE_VERSION: "3.4"
};

export const composeSafeKeys: (keyof ComposeService)[] = [
  "cap_add",
  "cap_drop",
  "command",
  "depends_on",
  "devices",
  "entrypoint",
  "environment",
  "expose",
  "extra_hosts",
  "healthcheck",
  "labels",
  "logging",
  "network_mode",
  "networks",
  "ports",
  "privileged",
  "restart",
  "stop_grace_period",
  "stop_signal",
  "user",
  "volumes",
  "working_dir",
  "security_opt",
  "image",
  "build",
  "volumes",
  "environment",
  "pid",
  "container_name",
  "dns",
  "ulimits",
  "deploy"
];
