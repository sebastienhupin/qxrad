/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

qx.Class.define("qxrad.plugin.designer.patch.qx_ui_embed_Flash",
{
  extend : qxrad.plugin.designer.component.Widget,


  /**
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
  members :
  {
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _createObject : function()
    {
      var clazz = qx.Class.getByName(this.getClassname());
      var object = new clazz("qxrad/fo_tester.swf");
      object.set({ mayScript : false });
      this.setObject(object);
      return object;
    },


    /**
     * TODOC
     *
     * @param otherCode {var} TODOC
     * @return {var} TODOC
     */
    getCode : function(otherCode)
    {
      var template = new qxrad.plugin.designer.template.build.Flash();
      var code = [];

      // The property source of qx.ui.embed.Flash can not be null end must be setting when the class is instantiate.
      if (!this._isClassModel)
      {

        code.push(qx.module.Template.render(template.getTemplateObjectDefinition(),
        {
          "name"      : this.getName(),
          "classname" : this._transformClassname ? this._transformClassname() : this.getClassname(),
          "source"    : ("'" + this.getProperty("source") + "'")
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

      // Delete the property source in the list before writing the code
      // because this property can not be setting after the Flash object is created.
      if (this._properties && qx.lang.Object.getLength(this._properties) > 0)
      {
        var properties = this._properties;
        delete properties.source;
        var props = [];

        for (var name in properties)
        {
          // Determine whether it is a property object.
          if (qxrad.util.Component.isPropertyObject(this.getObject().constructor, name)) {
            props.push("\t\t" + name + ":" + this.getPropertyObject(name).getName());
          }
          else
          {
            if (qx.lang.Type.isString(properties[name])) {
              props.push("\t\t" + name + ":\"" + properties[name] + "\"");
            } else {
              props.push("\t\t" + name + ":" + properties[name]) + "";
            }
          }
        }

        code.push(qx.module.Template.render(template.getTemplatePropertiesDefinition(),
        {
          "name"       : this._isClassModel ? "this" : this.getName(),
          "properties" : "{\n" + props.join(",\n") + "\n\t}"
        }));
      }

      code.push(otherCode);

      if (qx.lang.Object.getLength(this.getLayoutProperties()) > 0)
      {
        var properties = qx.lang.Json.stringify(this.getLayoutProperties());

        code.push(qx.module.Template.render(template.getTemplateLayoutPropertiesDefinition(),
        {
          "name"       : this._isClassModel ? "this" : this.getName(),
          "properties" : qx.lang.Json.stringify(this.getLayoutProperties())
        }));
      }

      return code.join("");
    }
  }
});