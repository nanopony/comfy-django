#!/usr/bin/env bash
./manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission -e admin --indent 4 --exclude=sessions --exclude=thumbnail > ./deploy/fixtures/1.json