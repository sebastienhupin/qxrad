/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.plugin.theme.view.Editor",
{
  extend : qx.ui.container.Scroll,




  /*
      *****************************************************************************
         CONSTRUCTOR
      *****************************************************************************
      */

  /**
       * Create a new instance
       */
  construct : function()
  {
    this.base(arguments);

    this.init();
  },




  /*
      *****************************************************************************
         EVENTS
      *****************************************************************************
      */

  /*
      events :
      {

      },
  */

  /*
       *****************************************************************************
          PROPERTIES
       *****************************************************************************
       */

  /*
       properties :
       {

       },
  */

  /*
       *****************************************************************************
          STATICS
       *****************************************************************************
       */

  /*
       statics :
       {

       },
  */

  /*
        *****************************************************************************
           MEMBERS
        *****************************************************************************
        */

  members :
  {
    __listComponents : null,
    __container : null,


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUIDefinition : function()
    {
      var GroupBox_5750 = new qx.ui.groupbox.GroupBox();
      var layoutGroupBox_5750 = new qx.ui.layout.VBox();
      GroupBox_5750.setLayout(layoutGroupBox_5750);
      this.__container.add(GroupBox_5750);

      var Composite_5958 = new qx.ui.container.Composite();
      var layoutComposite_5958 = new qx.ui.layout.Flow();
      layoutComposite_5958.set({ "spacingX" : 5 });
      Composite_5958.setLayout(layoutComposite_5958);
      GroupBox_5750.add(Composite_5958);

      var Atom_7585 = new qx.ui.basic.Atom();
      Atom_7585.set({ "label" : "Atom" });
      Composite_5958.add(Atom_7585);

      var Image_7700 = new qx.ui.basic.Image();
      Image_7700.set({ "source" : "qxrad/test.png" });
      Composite_5958.add(Image_7700);

      var Label_7803 = new qx.ui.basic.Label();
      Label_7803.set({ "value" : "Label" });
      Composite_5958.add(Label_7803);

      var GroupBox_8770 = new qx.ui.groupbox.GroupBox();
      var layoutGroupBox_8770 = new qx.ui.layout.VBox();

      layoutGroupBox_8770.set(
      {
        "alignX"  : "left",
        "spacing" : 10
      });

      GroupBox_8770.setLayout(layoutGroupBox_8770);

      GroupBox_8770.set(
      {
        "allowGrowY"   : true,
        "allowShrinkY" : true,
        "marginTop"    : 10
      });

      this.__container.add(GroupBox_8770);

      var Composite_8891 = new qx.ui.container.Composite();
      var layoutComposite_8891 = new qx.ui.layout.Flow();
      layoutComposite_8891.set({ "spacingX" : 5 });
      Composite_8891.setLayout(layoutComposite_8891);
      GroupBox_8770.add(Composite_8891);

      var Button_10140 = new qx.ui.form.Button();
      Button_10140.set({ "label" : "Button" });
      Composite_8891.add(Button_10140);

      var CheckBox_10414 = new qx.ui.form.CheckBox();
      CheckBox_10414.set({ "label" : "CheckBox" });
      Composite_8891.add(CheckBox_10414);

      var ComboBox_10559 = new qx.ui.form.ComboBox();
      Composite_8891.add(ComboBox_10559);

      var HoverButton_10707 = new qx.ui.form.HoverButton();
      HoverButton_10707.set({ "label" : "HoverButton" });
      Composite_8891.add(HoverButton_10707);

      var MenuButton_10845 = new qx.ui.form.MenuButton();
      MenuButton_10845.set({ "label" : "MenuButton" });
      Composite_8891.add(MenuButton_10845);

      var PasswordField_11836 = new qx.ui.form.PasswordField();
      Composite_8891.add(PasswordField_11836);

      var RadioButton_11997 = new qx.ui.form.RadioButton();
      RadioButton_11997.set({ "label" : "RadioButton" });
      Composite_8891.add(RadioButton_11997);

      var RepeatButton_12125 = new qx.ui.form.RepeatButton();
      RepeatButton_12125.set({ "label" : "RepeatButton" });
      Composite_8891.add(RepeatButton_12125);

      var SelectBox_12244 = new qx.ui.form.SelectBox();
      Composite_8891.add(SelectBox_12244);

      var Slider_12393 = new qx.ui.form.Slider();
      Slider_12393.set({ "width" : 50 });
      Composite_8891.add(Slider_12393);

      var Spinner_12517 = new qx.ui.form.Spinner();
      Composite_8891.add(Spinner_12517);

      var SplitButton_12652 = new qx.ui.form.SplitButton();
      Composite_8891.add(SplitButton_12652);

      var TextArea_12782 = new qx.ui.form.TextArea();
      Composite_8891.add(TextArea_12782);

      var TextField_12890 = new qx.ui.form.TextField();
      Composite_8891.add(TextField_12890);

      var ToggleButton_13013 = new qx.ui.form.ToggleButton();
      ToggleButton_13013.set({ "label" : "ToggleButton" });
      Composite_8891.add(ToggleButton_13013);

      var GroupBox_18094 = new qx.ui.groupbox.GroupBox();
      var layoutGroupBox_18094 = new qx.ui.layout.VBox();
      GroupBox_18094.setLayout(layoutGroupBox_18094);
      this.__container.add(GroupBox_18094);

      var Composite_18470 = new qx.ui.container.Composite();
      var layoutComposite_18470 = new qx.ui.layout.Flow();
      layoutComposite_18470.set({ "spacingX" : 5 });
      Composite_18470.setLayout(layoutComposite_18470);
      GroupBox_18094.add(Composite_18470);

      var List_19132 = new qx.ui.form.List();
      Composite_18470.add(List_19132);

      var ListItem_20108 = new qx.ui.form.ListItem();
      ListItem_20108.set({ "label" : "ListItem" });
      List_19132.add(ListItem_20108);

      var CheckGroupBox_20898 = new qx.ui.groupbox.CheckGroupBox();
      var layoutCheckGroupBox_20898 = new qx.ui.layout.Basic();
      CheckGroupBox_20898.setLayout(layoutCheckGroupBox_20898);

      CheckGroupBox_20898.set(
      {
        "width"  : 100,
        "height" : 75
      });

      Composite_18470.add(CheckGroupBox_20898);

      var GroupBox_21504 = new qx.ui.groupbox.GroupBox();
      var layoutGroupBox_21504 = new qx.ui.layout.Basic();
      GroupBox_21504.setLayout(layoutGroupBox_21504);

      GroupBox_21504.set(
      {
        "width"  : 100,
        "height" : 75
      });

      Composite_18470.add(GroupBox_21504);

      var RadioGroupBox_21817 = new qx.ui.groupbox.RadioGroupBox();
      var layoutRadioGroupBox_21817 = new qx.ui.layout.Basic();
      RadioGroupBox_21817.setLayout(layoutRadioGroupBox_21817);

      RadioGroupBox_21817.set(
      {
        "width"  : 100,
        "height" : 75
      });

      Composite_18470.add(RadioGroupBox_21817);

      var TabView_22279 = new qx.ui.tabview.TabView();
      TabView_22279.set({ "width" : 100 });
      Composite_18470.add(TabView_22279);

      var Page_22425 = new qx.ui.tabview.Page();
      var layoutPage_22425 = new qx.ui.layout.Basic();
      Page_22425.setLayout(layoutPage_22425);

      Page_22425.set(
      {
        "label"      : "Page",
        "visibility" : "visible"
      });

      TabView_22279.add(Page_22425);

      var Tree_22790 = new qx.ui.tree.Tree();
      Tree_22790.set({ "width" : 120 });
      Composite_18470.add(Tree_22790);

      var TreeFolder_22914 = new qx.ui.tree.TreeFolder();

      TreeFolder_22914.set(
      {
        "open"       : true,
        "label"      : "TreeFolder",
        "visibility" : "visible"
      });

      Tree_22790.setRoot(TreeFolder_22914);

      var TreeFile_23037 = new qx.ui.tree.TreeFile();
      TreeFile_23037.set({ "label" : "TreeFile" });
      TreeFolder_22914.add(TreeFile_23037);

      var TreeFolder_23158 = new qx.ui.tree.TreeFolder();

      TreeFolder_23158.set(
      {
        "open"  : true,
        "label" : "TreeFolder"
      });

      TreeFolder_22914.add(TreeFolder_23158);

      var TreeFolder_23276 = new qx.ui.tree.TreeFolder();
      TreeFolder_23276.set({ "label" : "TreeFolder" });
      TreeFolder_23158.add(TreeFolder_23276);

      var tableModel_Table_23442 = new qx.ui.table.model.Simple();
      tableModel_Table_23442.setColumns([ "MyName" ], [ "MyId" ]);
      var Table_23442 = new qx.ui.table.Table();

      Table_23442.set(
      {
        "metaColumnCounts" : [ -1 ],
        "tabIndex"         : 1,
        "height"           : 100
      });

      Composite_18470.add(Table_23442);

      Table_23442.setTableModel(tableModel_Table_23442);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __createUI : function()
    {
      this.setWidth(800);
      this.setHeight(600);
      this.__container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      this.add(this.__container);

      this.__createUIDefinition();
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    reset : function()
    {
      // This is utility to switch theme at runtime.
      qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Modern);
      qx.theme.manager.Meta.getInstance().setTheme(MyCustomTheme);
      this.__container.removeAll();
      this.__createUIDefinition();
    },

    // Public Members.
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function() {
      this.__createUI();
    }
  },




  /*
         *****************************************************************************
            DESTRUCTOR
         *****************************************************************************
         */

  destruct : function() {}
});