'''
Created on Nov 1, 2010

@author: sebastienhupin
'''
import os
import urlparse

from qxjsonrpc.http import HTTPRequestHandler
from BaseHTTPServer import HTTPServer as BaseHTTPServer

from qxjsonrpc._server import Server

from qxrad.services.application import Application
from qxrad.services.filesystem import Filesystem
from qxrad.services.project import Project

#============================================================================
# Exported symbols
__all__=['QxradHTTPServer']
#============================================================================


class QxradHTTPRequestHandler(HTTPRequestHandler):
    def __init__(self, request, client_address, server):
            HTTPRequestHandler.__init__(self, request, client_address, server)    
    def do_GET(self):
        print "do_GET : %s"%self.path
        url=urlparse.urlparse(self.path)
        file_path = os.getcwd() + "" + url[2]
        
        if (os.path.isfile(file_path)):
            '''If the file exist in the doc root so return the content'''
            try:
                with open(file_path) as f:
                    self.wfile.write(f.read())
            except IOError:
                self.send_error(500, 'Internal server error')
        else :
            HTTPRequestHandler.do_GET(self)

class QxradHTTPServer(Server, BaseHTTPServer):
    '''HTTP JSON-RPC server.'''
    def __init__(self, host='127.0.0.1', port=8080, domain=None, logger=None, debug=False):
        if domain is None:
            if port==80:
                domain=host
            else:
                domain='%s:%d'%(host,port)
        Server.__init__(self, domain, logger, debug)
        BaseHTTPServer.__init__(self, (host,port), QxradHTTPRequestHandler)
        '''Setting all services using in this application'''
        self.setService('qxrad.application', Application())
        self.setService('qxrad.filesystem', Filesystem())
        self.setService('qxrad.project', Project())
