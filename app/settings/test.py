from .base import *


class DisableMigrations(object):
    def __contains__(self, item):
        return True

    def __getitem__(self, item):
        return "notmigrations"


MIGRATION_MODULES = DisableMigrations()
CELERY_EAGER_PROPAGATES_EXCEPTIONS = True
CELERY_ALWAYS_EAGER = True
BROKER_BACKEND = 'memory'

DATABASES = {
    "default": {
        'ENGINE': 'django.db.backends.sqlite3',
        "NAME": "test.db",
        "USER": "",
        "PASSWORD": "",
        "HOST": "",
        "PORT": "",
    }
}

SECRET_KEY = 'SKDEOEJOF#O*#)LWLKJDLKWLKSSAS'

PASSWORD_HASHERS = (
    'django.contrib.auth.hashers.MD5PasswordHasher',
)


DEBUG = False
TEMPLATE_DEBUG = False

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'ERROR',
        },
        'marketing': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    }
}

NOSE_ARGS = [
    # '--with-coverage',
    '--verbosity=3',
    '--nocapture',
    '--nologcapture',
    '--exclude-dir=django_email_multibackend',
    '--exclude-dir=rosetta',
]
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}



