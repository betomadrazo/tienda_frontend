#!/bin/bash
find ./build/ -type f | xargs sed -i 's%/tienda/static/%/static/tienda/static/%g'

