/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.designer.ui.table.celleditor.CheckBox",
{
  extend : qx.ui.table.celleditor.CheckBox,




  /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

  members :
  {
    // interface implementation
    /**
     * TODOC
     *
     * @param cellInfo {var} TODOC
     * @return {var} TODOC
     */
    createCellEditor : function(cellInfo)
    {
      var editor = new qx.ui.container.Composite(new qx.ui.layout.HBox().set(
      {
        alignX : "left",
        alignY : "middle"
      })).set(
      {
        focusable   : true,
        paddingTop  : -5,
        paddingLeft : 5
      });

      var checkbox = new qx.ui.form.CheckBox().set({ value : cellInfo.value });
      editor.add(checkbox);

      // propagate focus
      editor.addListener("focus", function() {
        checkbox.focus();
      });

      // propagate active state
      editor.addListener("activate", function() {
        checkbox.activate();
      });

      // propagate stopped enter key press to the editor
      checkbox.addListener("keydown", function(e)
      {
        if (e.getKeyIdentifier() == "Enter")
        {
          var clone = qx.event.Pool.getInstance().getObject(qx.event.type.KeySequence);
          var target = editor.getContentElement().getDomElement();
          clone.init(e.getNativeEvent(), target, e.getKeyIdentifier());
          clone.setType("keypress");
          qx.event.Registration.dispatchEvent(target, clone);
        }
      },
      this);

      return editor;
    }
  }
});