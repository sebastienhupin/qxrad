'''
Created on Nov 1, 2010

@author: sebastienhupin
'''
from qxjsonrpc import public, fail

#============================================================================
# Exported symbols
__all__=['Filesystem']
#============================================================================


class Filesystem(object):
    @public
    def test(self):
        return 'Filesystem passed ...'
