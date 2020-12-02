# onstar2mqtt
A service that utilizes the [OnStarJS](https://github.com/samrum/OnStarJS) library to expose OnStar data to MQTT topics. Mostly focused around EVs, however happy to accept PRs for other vehicle types.

There is no official relationship with GM, Chevrolet nor OnStar. In fact, it would be nice if they'd even respond to development requests, so we wouldn't have to reverse engineer their API.

## Running
Collect the following information:
1. [Generate](https://www.uuidgenerator.net/version4) a v4 uuid for the device ID
1. OnStar login: username, password, PIN
1. Your car's VIN. Easily found in the monthly OnStar diagnostic emails.
1. MQTT server information: hostname, username, password
    1. If using TLS, define `MQTT_PORT` and `MQTT_TLS=true`

Supply these values to the ENV vars below.
### [Docker](https://hub.docker.com/r/michaelwoods/onstar2mqtt)

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
  michaelwoods/onstar2mqtt:latest
```
### docker-compose
```yaml
  onstar2mqtt:
    container_name: onstar2mqtt
    image: michaelwoods/onstar2mqtt
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
```
### Node.js
It's a typical node.js application, define the same environment values as described in the docker sections and run with:
`npm run start`. Currently only tested with Node.js 12.x.

### Home Assistant configuration templates
MQTT auto discovery is enabled, for further integrations see [HA-MQTT.md](HA-MQTT.md).

## TODO
1. Logging library
1. Figure out metric->imperial unit handling
1. Enable write actions to lock doors, flash lights, remote start, etc.
