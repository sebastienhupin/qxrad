/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.component.Abstract",
{
  type : "abstract",
  extend : qx.core.Object,


  /**
     * ****************************************************************************
     * CONSTRUCTOR
     * ****************************************************************************
     */
  /**
     * Create a new instance
     */
  construct : function() {
    this.base(arguments);
  },


  /**
     * ****************************************************************************
     * PROPERTIES
     * ****************************************************************************
     */
  properties :
  {
    name :
    {
      check : "String",
      init  : null,
      event : "changeName"
    },

    type :
    {
      check : "String",
      init  : null
    },

    classname :
    {
      check : "String",
      init  : null
    },

    activate :
    {
      check : "Boolean",
      init  : false,
      event : "changeActivate",
      apply : "_applyActivate"
    }
  },


  /**
     * ****************************************************************************
     * MEMBERS
     * ****************************************************************************
     */
  members :
  {
    // Private members.
    __hashcode : null,

    // List properties of the object.
    _properties : null,

    // List object properties of the object.
    _propertiesObject : null,
    
    // Temporary list objects properties.
    _temporaryObjecstProperties : null,
    // Utility to use a classname different of the real classname.
    // It use for patched qx.ui.core.widget and add layout, children handling.
    // Take a look at qxrad.plugin.designer.template.MyWidget.    
    _transformClassname : null,
    _isClassModel : false,
    _isPropertyObject : false,
    _template : null,


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _createObject : function()
    {
      var clazz = qx.Class.getByName(this.getClassname());
      var object = new clazz();
      this.setObject(object);
      return object;
    },


    /**
         * This method gets called after a object has been attached to the
         * component.
         */
    _afterObjectSetting : null,

    /**
     * TODOC
     *
     * @abstract
     * @param value {var} TODOC
     * @param oldValue {var} TODOC
     * @return {void}
     * @throws the abstract function warning.
     */
    _applyActivate : function(value, oldValue) {
      throw new Error("_applyActivate is abstract !!!");
    },


    /**
     * TODOC
     *
     * @abstract
     * @param name {var} TODOC
     * @return {void}
     * @throws the abstract function warning.
     */
    _getProperty : function(name) {
      throw new Error("_getProperty is abstract !!!");
    },


    /**
     * TODOC
     *
     * @abstract
     * @param name {var} TODOC
     * @param value {var} TODOC
     * @return {void}
     * @throws the abstract function warning.
     */
    _setProperty : function(name, value) {
      throw new Error("_setProperty is abstract !!!");
    },

    // Public members.
    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @return {var} TODOC
     */
    getPropertyObject : function(name)
    {
      var value = null;

      if (this._propertiesObject && this._propertiesObject[name]) {
        value = this._propertiesObject[name];
        // check for qxrad.util.Date and return the Date object.
        if (value.getObject().classname == "qxrad.util.Date") {
        	delete this._propertiesObject[name];
        	return value.getObject().getValue();
        }
      }
      else
      {
        var objectValue = this._getProperty(name);

        if (objectValue)
        {
          var component = qxrad.util.Component.createWithObject(objectValue);
          value = component;
        }
        else
        {
          value = null;
        }
      }

      return value;
    },


    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @param value {var} TODOC
     * @return {void}
     */
    setPropertyObject : function(name, value)
    {
      if (!this._propertiesObject) {
        this._propertiesObject = {};
      }
      
      // Determine whether the value is a class of
      // qxrad.plugin.designer.component.Abstract.
      if (value && !qx.Class.isSubClassOf(value.constructor, qx.Class.getByName("qxrad.plugin.designer.component.Abstract")))
      {
        // Create a component and attatch the object to it.
        var component = qxrad.util.Component.createWithObject(value);        
        value = component;
      }

      if (value)
      {
        if (!this._properties) {
          this._properties = {};
        }
        value._isPropertyObject = true;
        this._propertiesObject[name] = value;
        this._properties[name] = value.getName();
      }
      else
      {
        delete this._propertiesObject[name];
        delete this._properties[name];
      }

      this._setProperty(name, value ? value.getObject() : null);
    },


    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @return {var} TODOC
     */
    getProperty : function(name)
    {
      var value = null;

      // Determine whether it is a property object.
      if (qxrad.util.Component.isPropertyObject(this.getObject().constructor, name)) {
        return this.getPropertyObject(name);
      }

      if (this._properties && this._properties[name]) {
        value = this._properties[name];
      } else {
        value = this._getProperty(name);
      }

      return value;
    },


    /**
     * TODOC
     *
     * @param name {var} TODOC
     * @param value {var} TODOC
     * @return {void}
     */
    setProperty : function(name, value)
    {
      if (!this._properties) {
        this._properties = {};
      }

      // Determine whether it is a property object.
      if (qxrad.util.Component.isPropertyObject(this.getObject().constructor, name))
      {
        this.setPropertyObject(name, value);
        return;
      }
      if (value == null) {        
        delete this._properties[name];        
      }
      else {      	
      	this._properties[name] = value;        
      }

      this._setProperty(name, value);
    },


    getPropertiesObject : function () {
    	return this._propertiesObject;
    },
    
    setPropertiesObject : function (properties) {  	
      for (var i=0, l=properties.length; i<l; i++)
      {
        var object = qxrad.util.Component.createWithSource(properties[i]);
        
        if (!this._temporaryObjecstProperties) {
        	this._temporaryObjecstProperties = {};
        }

        this._temporaryObjecstProperties[object.getName()] = object;
      }
    },
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getProperties : function() {
      return qx.Class.getProperties(this.getObject().constructor);
    },

    setProperties : function (properties) {
      for (var name in properties)
      {      	
        // Check before whether is an object property.
        if (qxrad.util.Component.isPropertyObject(this.getObject().constructor, name)) {
        	var object = properties[name];
        	if (this._temporaryObjecstProperties && this._temporaryObjecstProperties[properties[name]]) {
        		object = this._temporaryObjecstProperties[properties[name]];
        	}
          this.setPropertyObject(name, object);
        }
        else if (this._propertiesObject && this._propertiesObject[properties[name]]) {
        	this.setProperty(name, this.getPropertyObject(properties[name]));
        }
        else {
          this.setProperty(name, properties[name]);
        }        
      }    	
    },

    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getObject : function() {
      return qx.core.ObjectRegistry.fromHashCode(this.__hashcode);
    },

    
    /**
     * TODOC
     *
     * @param object {var} TODOC
     * @return {void}
     * @throws TODOC
     */
    setObject : function(object)
    {
      this.debug("set object : " + object);
      if (this.__hashcode) {
        throw new Error("There is already a widget attached to this componentt.");
      }
      
      this.__hashcode = object.toHashCode();

      if (!this.getClassname()) {
        this.setClassname(object.classname);
      }

      if (!this.getName()) {
        this.setName(object.basename + "_" + this.__hashcode);
      }

      if (this._afterObjectSetting) {
        this._afterObjectSetting();
      }
    },


    /**
     * TODOC
     *
     * @param source {var} TODOC
     * @return {void}
     */
    setSource : function(source)
    {
      this.setClassname(source.classname);

      var object = this._createObject();

      this.setName(source.name ? source.name : object.basename + "_" + this.__hashcode);
      
      var objects = null;

      if (source.objects)
      {
      	this.setPropertiesObject(source.objects);
      }
      
      if (source.properties)
      {
      	this.setProperties(source.properties);
      }
      
    },

    // Return the serialization of this component.
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    serialize : function()
    {
      var source =
      {
        "classname" : this.getClassname(),
        "name"      : this.getName()
      };
                  
      // Now serialize object properties.
      if (this._propertiesObject && qx.lang.Object.getLength(this._propertiesObject) > 0)
      {
        source["objects"] = [];
        var propertiesObject = this._propertiesObject;

        for (var key in propertiesObject)
        {
          var component = propertiesObject[key];
          source["objects"].push(component.serialize());
        }
      }

      if (this._properties && qx.lang.Object.getLength(this._properties) > 0) {
      	source["properties"] = {};
      	var properties =  this._properties;
      	for (var key in properties) {      		
      		var value = properties[key];
      		if (qx.lang.Type.isDate(value)) {
      			if (!source.objects) {
      				source["objects"] = [];
      			}
      			source["objects"].push({
      				"classname" : "qxrad.util.Date",
      				"name" : "DateFormat_" + this.__hashcode,
      				"properties" : {
      					"value" : qx.bom.String.escape(new qx.util.format.DateFormat().format(value)) 
      				}
      			});
      			source["properties"][key] = "DateFormat_" + this.__hashcode;
      		}
      		else {
      			source["properties"][key] = properties[key];
      		}
      	}        
      }

      return source;
    },


    /**
     * TODOC
     *
     * @param source {var} TODOC
     * @return {void}
     */
    load : function(source)
    {
      if (!source) {
        return;
      }

      this.setSource(source);
    },


    /**
     * TODOC
     *
     * @param otherCode {var} TODOC
     * @return {var} TODOC
     */
    getCode : function(otherCode)
    {
      var template = this._template ? new this._template : new qxrad.plugin.designer.template.build.Default();
      var code = [];

      if (!this._isClassModel)
      {

        code.push(qx.module.Template.render(template.getTemplateObjectDefinition(),
        {
          "name"      : this.getName(),
          "classname" : this._transformClassname ? this._transformClassname() : this.getClassname()
        }));
      }

      if (this._propertiesObject && qx.lang.Object.getLength(this._propertiesObject) > 0)
      {
        var propertiesObject = this._propertiesObject;

        for (var name in propertiesObject)
        {
          var object = propertiesObject[name];
          code.push(object.getCode());
        }
      }

      if (this._properties && qx.lang.Object.getLength(this._properties) > 0)
      {
        var properties = this._properties;
        var props = [];

        for (var name in properties)
        {
          // Determine whether it is a property object.
          if (qxrad.util.Component.isPropertyObject(this.getObject().constructor, name)) {
            props.push("\t\t" + name + ":" + this.getPropertyObject(name).getName());
          }
          else
          {
          	if (qx.lang.Type.isDate(properties[name])) {
          		props.push("\t\t" + name + ":new Date(\"" + properties[name] + "\")");
          	}
          	else if (qx.lang.Type.isString(properties[name])) {
              props.push("\t\t" + name + ":\"" + properties[name] + "\"");
            } else {
              props.push("\t\t" + name + ":" + properties[name]) + "";
            }
          }
        }
        
        console.log(props.join(",\n"));
        console.log(qx.module.Template.render(template.getTemplatePropertiesDefinition(),
        {
          "name"       : this._isClassModel ? "this" : this.getName(),
          "properties" : "{\n" + props.join(",\n") + "\n\t}"
        }));
        
        code.push(qx.module.Template.render(template.getTemplatePropertiesDefinition(),
        {
          "name"       : this._isClassModel ? "this" : this.getName(),
          "properties" : "{\n" + props.join(",\n") + "\n\t}"
        }));
      }
      console.log(code);
      
      code.push(otherCode);

      return code.join("");
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    build : function()
    {
      var classCode = [];
      var code = this.getCode();
      var template = this._template ? new this._template : new qxrad.plugin.designer.template.build.Default();

      classCode.push(qx.module.Template.render(template.getTemplateClassDefinition(),
      {
        "namespace" : "my.Widget",
        "classname" : this._transformClassname ? this._transformClassname() : this.getClassname(),
        "code"      : code
      }));


      classCode.push(qx.module.Template.render(template.getTemplateToTryWithPlayground(),{}));

      return classCode.join("");
    }
  }
});