FROM local/management-service

COPY ./healthcheck ./
COPY ./healthcheck.js ./
COPY ./entrypoint.sh /opt/orbs/service

RUN apk add daemontools --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

HEALTHCHECK CMD /opt/orbs/healthcheck
