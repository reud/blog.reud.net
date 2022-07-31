#!/bin/sh


/Users/reud/go/bin/tcardgen -f ./../../../tcardgen/font \
           -o . \
           -c ./../../../tcardgen/config.yaml \
           -t ./../../../tcardgen/template-img.png \
           ./index.md
git add . && git commit -m "update contents" && git push
cd ../../../ && git add contents && git commit -m "update diary from submodule" && git push