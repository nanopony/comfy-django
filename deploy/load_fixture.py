#!/usr/bin/env python

import argparse
import os

parser = argparse.ArgumentParser()
parser.add_argument('-x', dest='drop_old_db', action='store_true')
parser.add_argument('-m', dest='cp_media', action='store_true')
parser.add_argument('-f', dest='apply_fixture', action='store_true')

args = parser.parse_args()

if args.drop_old_db:
    os.system("./manage.py flush --no-input")

# if args.cp_media:
#     if not os.path.isfile('./media.tgz'):
#         os.system("curl -O ....")
#     os.system("tar -zxvf ./media.tgz")

if args.apply_fixture:
    os.system("./manage.py loaddata ./deploy/fixtures/1.json")
