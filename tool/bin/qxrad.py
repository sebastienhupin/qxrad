'''
Created on Oct 31, 2010

@author: sebastienhupin
'''
from optparse import OptionParser

import os, sys, webbrowser
############################
# PYTHONPATH extension
############################
import qxideenviron

from qxrad.config.Config import Config

from qxrad.server.http import QxradHTTPServer

def parse_options():
    '''parse command line options'''
    usage = '''python qxrad.py [options]'''
    parser = OptionParser(usage)
    parser.add_option("--env",action="store", type="string", dest="env", default="build",
                      help="Choose your environment (source,build)")

    parser.add_option("--host",action="store", type="string", dest="host", default="127.0.0.1", 
                      help="Choose your host name")
    
    parser.add_option("--port",action="store", type="int", dest="port", default=8080, 
                      help="Choose your port number")
        
    (options, dummy) = parser.parse_args()    
    qxide_env = options.env
    host = options.host
    port = options.port
    url = "http://%s:%d/%s/index.html"%(host,port,qxide_env)
    return (host,port,url)

def open_browser(url):
    try:
        if sys.platform == "darwin":
            client = webbrowser.get("open -a /Applications/Firefox.app %s")
        else:    
            client = webbrowser.get("firefox")
        client.open_new(url)
        return
    except:
        try:
            client = webbrowser.get()
            client.open_new(url)
            return
        except:
            print('Unable to open %s.' % url)
            sys.exit(1)

def start_server(host,port,url):
    srv=QxradHTTPServer(host,port)
    open_browser(url)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server.'
        srv.socket.close()

def config():
    cfg = Config("config/qxrad.json")
    print cfg.get("qooxdoo.path")

def main():
    '''Change directory for accessing all file.''' 
    os.chdir("../..")      
    (host,port,url) = parse_options()
    config()
    start_server(host,port,url)

if __name__ == '__main__':
    main()