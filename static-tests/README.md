# Static Tests files

Used by other orbs-repo to test compatibility with management-service endpoints.

Make sure you change this in concert with the "other side"

## management-vc-file.json

This file serves each ONG node (each vc) as a management service input. Usually access via http://<node-ip>:7666/vchains/<vcid>/management

Currently used by:
- orbs-network/orbs-network-go Test : TestManagementFileProvider_ReadUrl

