'''
Created on Nov 2, 2010

@author: sebastienhupin
'''
import types, re
import simplejson as json

class Config(object):
    def __init__(self,file=None):
        self._file = file
        self._data = None
        self._init_data()
        return

    def _init_data(self):
        if self._file:
            obj = open(self._file)
            jsonstr = obj.read()
        try:
            data = json.loads(jsonstr)
        except ValueError, e:
            e.args = (e.args[0] + "\nFile: %s" % file) + e.args[1:]
            raise e
            
        obj.close()
        self._data  = data

    def get(self, key):
        item = self._find_key(key,self._data)                
        return self._replaceVariable(item)
    
    def _find_key(self,key,data):
        pathList = key.split(".")
        if len(pathList) > 1:
            item = data
            for k in pathList:
                try:
                    item = item[k]
                except KeyError as e:
                    e.args = ("Key %s not found" % k,) + e.args[1:]
                    raise e
            return item

        for _key in data:
            if cmp(key,_key) == 0:
                return data[_key]
            else:
                if not isinstance(data[_key], types.StringTypes):
                    return self._find_key(key,data[_key])
        
    def _replaceVariable (self,s):
        if s.find(r'${') == -1:
            return s
        possiblyBin = re.match(r'\${(.*)}', s)
        if possiblyBin:
            pathList = possiblyBin.group(1).split(".")
            data = self._data
            for k in pathList:
                data = data[k]
            return re.sub(r'\${(.*)}', data, s)
                