# monkey-patch django-filter's core class
import six
from django.db.models import Q
from django_filters.constants import EMPTY_VALUES
from django_filters.fields import Lookup
from django_filters.filters import Filter


def filter_multiple_names(self, qs, value):
    if isinstance(value, Lookup):
        lookup = six.text_type(value.lookup_type)
        value = value.value
    else:
        lookup = self.lookup_expr
    if value in EMPTY_VALUES:
        return qs
    if self.distinct:
        qs = qs.distinct()
    if isinstance(self.name, list):
        q_expression_set = None
        for name in self.name:
            q_expr = Q(**{'%s__%s' % (name, lookup): value})
            if q_expression_set is None:
                q_expression_set = q_expr
            else:
                q_expression_set = q_expression_set | q_expr

        qs = self.get_method(qs)(q_expression_set)
    else:
        qs = self.get_method(qs)(**{'%s__%s' % (self.name, lookup): value})
    return qs


Filter.filter = filter_multiple_names