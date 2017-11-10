from .base import *
try:
    from .local import *
except ImportError:
    import warnings
    warnings.warn("Please, create local.py in the ./app/settings/ folder to override local environment")
