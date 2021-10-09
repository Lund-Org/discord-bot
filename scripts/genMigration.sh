#!/bin/bash

./node_modules/.bin/ts-node ./node_modules/typeorm/cli.js migration:generate -n $1
