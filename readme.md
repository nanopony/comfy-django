# COMFY Template for Django

Bootstrap development for your project, featuring

- Vanilla DJANGO
- Webpack bundle build
- Hotreload
- Django Restframework
- Moduled settings

## Installation

1. Clone the repository
2. Change secret keys in ./app/settings/base.py
3. Create ./app/settings/local.py
4. Install dependencies by running `yarn` from the project root
5. Install dependencies by running `pip3 install -r ./requirements.txt`
6. Edit settings for the proper DB connection
7. `./manage.py migrate`

## Workflow

1. Run `yarn start` to start serving assets and hotreload
2. Run `./manage.py runserver 0.0.0.0:8000`
