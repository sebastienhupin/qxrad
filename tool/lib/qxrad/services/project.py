'''
Created on Nov 1, 2010

@author: sebastienhupin
'''
from qxjsonrpc import public, fail

#============================================================================
# Exported symbols
__all__=['Project']
#============================================================================


class Project(object):
    @public
    def test(self):
        return 'Project passed ...'
