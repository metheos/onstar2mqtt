# onstar2mqtt

[![ci](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/ci.yml/badge.svg)](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/ci.yml)
[![CodeQL](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/codeql-analysis.yml)
[![release](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/release.yml/badge.svg)](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/release.yml)
<!-- [![Notarize Assets with CAS](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/cas_notarize.yml/badge.svg)](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/cas_notarize.yml)
[![Authenticate Assets with CAS](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/cas_authenticate.yml/badge.svg)](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/cas_authenticate.yml)
[![Notarize and Authenticate Docker Image BOM with CAS](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/cas-docker-notarize-authenticate.yml/badge.svg)](https://github.com/BigThunderSR/onstar2mqtt/actions/workflows/cas-docker-notarize-authenticate.yml) -->

A service that utilizes the [OnStarJS](https://github.com/samrum/OnStarJS) library to expose OnStar data to MQTT topics.

~~The functionality is mostly focused around EVs (specifically the Bolt EV), however PRs for other vehicle types are certainly welcome.~~

There is no affiliation with this project and GM, Chevrolet nor OnStar. In fact, it would be nice if they'd even respond to development requests so we wouldn't have to reverse engineer their API.

## Running

Collect the following information:

1. [Generate](https://www.uuidgenerator.net/version4) a v4 uuid for the device ID
1. OnStar login: username, password, PIN
1. Your car's VIN. Easily found in the monthly OnStar diagnostic emails.
1. MQTT server information: hostname, username, password
    1. If using TLS, define `MQTT_PORT` and `MQTT_TLS=true`
    1. **NEW! - Provide MQTT topic (MQTT_ONSTAR_POLLING_STATUS_TOPIC) for Onstar Data Polling Status to monitor success/failure when OnStar is polled for data**
       * MQTT_ONSTAR_POLLING_STATUS_TOPIC/lastpollsuccessful - "true" or "false" depending on status of last poll
       * MQTT_ONSTAR_POLLING_STATUS_TOPIC/state - Polling Status and Detailed Error Messages in JSON

Supply these values to the ENV vars below. The default data refresh interval is 30 minutes and can be overridden with ONSTAR_REFRESH with values in milliseconds.

* **NEW - Command Response Status is now published to MQTT topics!**
    * Topic format: MQTT_PREFIX/{VIN}/command/{commandName}/state
        * Note: Unless defined, default MQTT_PREFIX=homeassistant   

### Docker

[Docker Hub](https://hub.docker.com/r/bigthundersr/onstar2mqtt)

```shell
docker run \
  --env ONSTAR_DEVICEID= \
  --env ONSTAR_VIN= \
  --env ONSTAR_USERNAME= \
  --env ONSTAR_PASSWORD= \
  --env ONSTAR_PIN= \
  --env MQTT_HOST= \
  --env MQTT_USERNAME \
  --env MQTT_PASSWORD \
  --env MQTT_ONSTAR_POLLING_STATUS_TOPIC \
  bigthundersr/onstar2mqtt:latest
```

[GitHub Container Registry](https://github.com/BigThunderSR/onstar2mqtt/pkgs/container/onstar2mqtt)

```shell
docker run \
  --env ONSTAR_DEVICEID= \
  --env ONSTAR_VIN= \
  --env ONSTAR_USERNAME= \
  --env ONSTAR_PASSWORD= \
  --env ONSTAR_PIN= \
  --env MQTT_HOST= \
  --env MQTT_USERNAME \
  --env MQTT_PASSWORD \
  --env MQTT_ONSTAR_POLLING_STATUS_TOPIC \
  ghcr.io/bigthundersr/onstar2mqtt:latest
```

### docker-compose

[Docker Hub](https://hub.docker.com/r/bigthundersr/onstar2mqtt)

```yaml
  onstar2mqtt:
    container_name: onstar2mqtt
    image: bigthundersr/onstar2mqtt
    restart: unless-stopped
    env_file:
      - /srv/containers/secrets/onstar2mqtt.env
    environment:
    - ONSTAR_DEVICEID=
    - ONSTAR_VIN=
    - MQTT_HOST=
```

[GitHub Container Registry](https://github.com/BigThunderSR/onstar2mqtt/pkgs/container/onstar2mqtt)

```yaml
  onstar2mqtt:
    container_name: onstar2mqtt
    image: ghcr.io/bigthundersr/onstar2mqtt
    restart: unless-stopped
    env_file:
      - /srv/containers/secrets/onstar2mqtt.env
    environment:
    - ONSTAR_DEVICEID=
    - ONSTAR_VIN=
    - MQTT_HOST=
```

onstar2mqtt.env:

```shell
ONSTAR_USERNAME=
ONSTAR_PASSWORD=
ONSTAR_PIN=
MQTT_USERNAME=
MQTT_PASSWORD=
MQTT_ONSTAR_POLLING_STATUS_TOPIC=

```

### Node.js

It's a typical node.js application, define the same environment values as described in the docker sections and run with:
`npm run start`. Currently, this is only tested with Node.js 18.x.

### Home Assistant configuration templates

MQTT auto discovery is enabled. For further integrations and screenshots see [HA-MQTT.md](HA-MQTT.md).

## Development

### Running with npm

`npm run start`

### Testing

`npm run test`

### Coverage

`npm run coverage`

### Releases

`npm version [major|minor|patch] -m "Version %s" && git push --follow-tags`

Publish the release on GitHub to trigger a release build (i.e. update 'latest' docker tag).

## If you would like to run this as a Home Assistant add-on

[https://github.com/BigThunderSR/homeassistant-addons-onstar2mqtt](https://github.com/BigThunderSR/homeassistant-addons-onstar2mqtt)

## My other related project which provides additional capabilities through Node-RED

[https://github.com/BigThunderSR/node-red-contrib-onstar2](https://github.com/BigThunderSR/node-red-contrib-onstar2)
