'''
Created on Nov 1, 2010

@author: sebastienhupin
'''
from qxjsonrpc import public, fail

#============================================================================
# Exported symbols
__all__=['Application']
#============================================================================


class Application(object):
    @public
    def init(self):
        print 'Application init ...'
        return None
    @public
    def test(self):
        return 'Application passed ...'
