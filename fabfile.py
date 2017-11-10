# -*- coding: utf-8 -*-
from fabric.api import task, cd, run
from fabric.context_managers import prefix
from fabric.state import env

DEV_HOST = 'root@production.local'
PRODUCTION_HOST = 'root@production.local'
SUPERVISOR_TASKNAME = 'django_app'

HOME = '/var/www/home'
SOURCE = 'source ./ve/bin/activate'


@task
def dev():
    env.hosts = [DEV_HOST]


@task
def prod():
    env.hosts = [PRODUCTION_HOST]


@task
def me():
    env.hosts = ['localhost']


@task
def deploy(pip=None, skip_webpack=None):
    with cd(HOME):
        run('touch ../enter_update')
        run('git pull')
        with prefix(SOURCE):
            if pip:
                run('pip3 install -q -r ./requirements.txt')
            if skip_webpack is None:
                run('yarn')
                run('yarn build-assets')

            run('python3 manage.py migrate --noinput')
            run('python3 manage.py collectstatic --noinput')
            run('chown -R www-data:www-data .')
            run('chmod -R g+w .')

            run('supervisorctl restart %s' % SUPERVISOR_TASKNAME)

        run('rm ../enter_update')
