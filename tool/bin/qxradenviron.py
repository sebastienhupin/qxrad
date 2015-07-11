
import sys, os

##
# qxideenviron.py -- provide PYTHONPATH extension
##

# calculate script path
scriptDir = os.path.dirname(os.path.abspath(sys.argv[0]))
 
# extend PYTHONPATH with 'lib'
sys.path.insert(0, 
    os.path.normpath(
        os.path.join( scriptDir, os.pardir, "lib")))

# extend PYTHONPATH with 'qooxdoo pylib' qooxdoo/tool/pylib
sys.path.insert(0, 
    os.path.normpath(
        os.path.join(os.path.dirname(os.path.abspath("../")), "qooxdoo/tool/pylib")))

#print sys.path
