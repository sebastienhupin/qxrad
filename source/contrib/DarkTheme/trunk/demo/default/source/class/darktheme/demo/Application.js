/* ************************************************************************

   Copyright:
     2010 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

/* ************************************************************************

#asset(darktheme.demo/*)

#asset(qx/icon/Oxygen/16/actions/*)
#asset(qx/icon/Oxygen/16/apps/*)
#asset(qx/icon/Oxygen/16/categories/*)
#asset(qx/icon/Oxygen/16/devices/*)
#asset(qx/icon/Oxygen/16/mimetypes/*)
#asset(qx/icon/Oxygen/16/places/*)
#asset(qx/icon/Oxygen/16/status/*)
#asset(qx/icon/Oxygen/22/actions/*)
#asset(qx/icon/Oxygen/22/apps/*)
#asset(qx/icon/Oxygen/22/mimetypes/*)
#asset(qx/icon/Oxygen/22/places/*)
#asset(qx/icon/Oxygen/32/actions/*)
#asset(qx/icon/Oxygen/32/apps/*)
#asset(qx/icon/Oxygen/32/devices/*)
#asset(qx/icon/Oxygen/32/status/*)
#asset(qx/icon/Oxygen/48/actions/*)
#asset(qx/icon/Oxygen/48/devices/*)
#asset(qx/icon/Oxygen/48/places/*)

************************************************************************ */

/**
 * This is a demo of the DarkTheme contribution
 */
qx.Class.define("darktheme.demo.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
  editor: null,

    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        ToolBarTop
      -------------------------------------------------------------------------
      */
      var showcaseButton = this.showcaseButton = new qx.ui.form.SelectBox();
      showcaseButton.set({font: "bold"});
      var emptyItem = this.emptyItem = new qx.ui.form.ListItem("<not selected>");
      var calcItem = this.calcItem = new qx.ui.form.ListItem("Calculator");
      var colorItem = this.colorItem = new qx.ui.form.ListItem("Color Selector");
      var formItem = this.formItem = new qx.ui.form.ListItem("Form");
      var editorItem = this.editorItem = new qx.ui.form.ListItem("HTML Editor");
      var tableItem = this.tableItem = new qx.ui.form.ListItem("Table");
      var browserItem = this.browserItem = new qx.ui.form.ListItem("Web Browser");
      
      showcaseButton.add(emptyItem);
      showcaseButton.add(calcItem);
      showcaseButton.add(colorItem);
      showcaseButton.add(formItem);
      showcaseButton.add(editorItem);
      showcaseButton.add(tableItem);
      showcaseButton.add(browserItem);
      
      showcaseButton.addListener("changeSelection", function(e)
      {
        var selItem = this.showcaseButton.getSelection()[0].getLabel();
        switch (selItem)
        {
          case "Calculator":
            this.calcWindow.open();
            break;
        
          case "Color Selector":
            this.colorWindow.open();
            break;
        
          case "Form":
            this.formWindow.open();
            break;
        
          case "HTML Editor":
            this.editorWindow.open();
            break;
        
          case "Table":
		    this.tableWindow.open();
            break;
        
          case "Web Browser":
            this.browserWindow.open();
            break;
        }
      }, this);
      
      var atomWidgets = this.atomWidgets = new darktheme.demo.Atom();
      var buttonWidgets = this.buttonWidgets = new darktheme.demo.Button();
      var canvasWidgets = this.canvasWidgets = new darktheme.demo.Canvas();
      var checkBoxWidgets = this.checkBoxWidgets = new darktheme.demo.CheckBox();
      var colorPopupWidgets = this.colorPopupWidgets = new darktheme.demo.ColorPopup();
      var comboBoxWidgets = this.comboBoxWidgets = new darktheme.demo.ComboBox();
      var dateChooserWidgets = this.dateChooserWidgets = new darktheme.demo.DateChooser();
      var dateFieldWidgets = this.dateFieldWidgets = new darktheme.demo.DateField();
      var desktopWidgets = this.desktopWidgets = new darktheme.demo.Desktop();
      var groupBoxWidgets = this.groupBoxWidgets = new darktheme.demo.GroupBox();
      var htmlWidgets = this.htmlWidgets = new darktheme.demo.HtmlEmbed();
      var imageWidgets = this.imageWidgets = new darktheme.demo.Image();
      var labelWidgets = this.labelWidgets = new darktheme.demo.Label();
      var listWidgets = this.listWidgets = new darktheme.demo.List();
      var menuWidgets = this.menuWidgets = new darktheme.demo.Menu();
      var menuBarWidgets = this.menuBarWidgets = new darktheme.demo.MenuBar();
      var popupWidgets = this.popupWidgets = new darktheme.demo.Popup();
      var radioButtonWidgets = this.radioButtonWidgets = new darktheme.demo.RadioButton();
      var radioGroupWidgets = this.radioGroupWidgets = new darktheme.demo.RadioButtonGroup();
      var resizerWidgets = this.resizerWidgets = new darktheme.demo.Resizer();
      var scrollbarWidgets = this.scrollbarWidgets = new darktheme.demo.ScrollBar();
      var selectBoxWidgets = this.selectBoxWidgets = new darktheme.demo.SelectBox();
      var slidebarWidgets = this.slidebarWidgets = new darktheme.demo.SlideBar();
      var sliderWidgets = this.sliderWidgets = new darktheme.demo.Slider();
      var spinnerWidgets = this.spinnerWidgets = new darktheme.demo.Spinner();
      var splitPaneWidgets = this.splitPaneWidgets = new darktheme.demo.SplitPane();
      var stackContainerWidgets = this.stackContainerWidgets = new darktheme.demo.StackContainer();
      var tabViewWidgets = this.tabViewWidgets = new darktheme.demo.TabView();
      var textFieldWidgets = this.textFieldWidgets = new darktheme.demo.TextField();
      var toolbarWidgets = this.toolbarWidgets = new darktheme.demo.ToolBar();
      var tooltipWidgets = this.tooltipWidgets = new darktheme.demo.Tooltip();
      var treeWidgets = this.treeWidgets = new darktheme.demo.Tree();
      var treeColumnWidgets = this.treeColumnWidgets = new darktheme.demo.TreeColumns();
      var treeVirtualWidgets = this.treeVirtualWidgets = new darktheme.demo.TreeVirtual();
      var windowWidgets = this.windowWidgets = new darktheme.demo.Window();
      
      var stack = this.stack = new qx.ui.container.Stack();
      stack.add(atomWidgets);
      stack.add(buttonWidgets);
      stack.add(canvasWidgets);
      stack.add(checkBoxWidgets);
      stack.add(colorPopupWidgets);
      stack.add(comboBoxWidgets);
      stack.add(dateChooserWidgets);
      stack.add(dateFieldWidgets);
      stack.add(desktopWidgets);
      stack.add(groupBoxWidgets);
      stack.add(htmlWidgets);
      stack.add(imageWidgets);
      stack.add(labelWidgets);
      stack.add(listWidgets);
      stack.add(menuWidgets);
      stack.add(menuBarWidgets);
      stack.add(popupWidgets);
      stack.add(radioButtonWidgets);
      stack.add(radioGroupWidgets);
      stack.add(resizerWidgets);
      stack.add(scrollbarWidgets);
      stack.add(selectBoxWidgets);
      stack.add(slidebarWidgets);
      stack.add(sliderWidgets);
      stack.add(spinnerWidgets);
      stack.add(splitPaneWidgets);
      stack.add(stackContainerWidgets);
      stack.add(tabViewWidgets);
      stack.add(textFieldWidgets);
      stack.add(toolbarWidgets);
      stack.add(tooltipWidgets);
      stack.add(treeWidgets);
      stack.add(treeColumnWidgets);
      stack.add(treeVirtualWidgets);
      stack.add(windowWidgets);
      
      stack.resetSelection();
      
      var widgetButton = this.widgetButton = new qx.ui.form.SelectBox();
      widgetButton.set({font: "bold"});
      widgetButton.add(new qx.ui.form.ListItem("<not selected>"));
      widgetButton.add(new qx.ui.form.ListItem("Atom"));
      widgetButton.add(new qx.ui.form.ListItem("Button"));
      widgetButton.add(new qx.ui.form.ListItem("Canvas"));
      widgetButton.add(new qx.ui.form.ListItem("CheckBox"));
      widgetButton.add(new qx.ui.form.ListItem("ColorPopup"));
      widgetButton.add(new qx.ui.form.ListItem("ComboBox"));
      widgetButton.add(new qx.ui.form.ListItem("DateChooser"));
      widgetButton.add(new qx.ui.form.ListItem("DateField"));
      widgetButton.add(new qx.ui.form.ListItem("Desktop"));
      widgetButton.add(new qx.ui.form.ListItem("GroupBox"));
      widgetButton.add(new qx.ui.form.ListItem("HtmlEmbed"));
      widgetButton.add(new qx.ui.form.ListItem("Image"));
      widgetButton.add(new qx.ui.form.ListItem("Label"));
      widgetButton.add(new qx.ui.form.ListItem("List"));
      widgetButton.add(new qx.ui.form.ListItem("Menu"));
      widgetButton.add(new qx.ui.form.ListItem("MenuBar"));
      widgetButton.add(new qx.ui.form.ListItem("Popup"));
      widgetButton.add(new qx.ui.form.ListItem("RadioButton"));
      widgetButton.add(new qx.ui.form.ListItem("RadioButtonGroup"));
      widgetButton.add(new qx.ui.form.ListItem("Resizer"));
      widgetButton.add(new qx.ui.form.ListItem("ScrollBar"));
      widgetButton.add(new qx.ui.form.ListItem("SelectBox"));
      widgetButton.add(new qx.ui.form.ListItem("SlideBar"));
      widgetButton.add(new qx.ui.form.ListItem("Slider"));
      widgetButton.add(new qx.ui.form.ListItem("Spinner"));
      widgetButton.add(new qx.ui.form.ListItem("SplitPane"));
      widgetButton.add(new qx.ui.form.ListItem("StackContainer"));
      widgetButton.add(new qx.ui.form.ListItem("TabView"));
      widgetButton.add(new qx.ui.form.ListItem("TextField"));
      widgetButton.add(new qx.ui.form.ListItem("ToolBar"));
      widgetButton.add(new qx.ui.form.ListItem("Tooltip"));
      widgetButton.add(new qx.ui.form.ListItem("Tree"));
      widgetButton.add(new qx.ui.form.ListItem("Tree Columns"));
      widgetButton.add(new qx.ui.form.ListItem("TreeVirtual"));
      widgetButton.add(new qx.ui.form.ListItem("Window"));
      
      widgetButton.addListener("changeSelection", function(e)
      {
        this.closeShowcase();
        var selItem = this.widgetButton.getSelection()[0].getLabel();
        switch (selItem)
        {
          case "Atom":
            this.stack.setSelection([this.stack.getChildren()[0]]);
            break;
        
          case "Button":
            this.stack.setSelection([this.stack.getChildren()[1]]);
            break;
        
          case "Canvas":
            this.stack.setSelection([this.stack.getChildren()[2]]);
            break;
        
          case "CheckBox":
            this.stack.setSelection([this.stack.getChildren()[3]]);
            break;
        
          case "ColorPopup":
            this.stack.setSelection([this.stack.getChildren()[4]]);
            break;
        
          case "ComboBox":
            this.stack.setSelection([this.stack.getChildren()[5]]);
            break;
        
          case "DateChooser":
            this.stack.setSelection([this.stack.getChildren()[6]]);
            break;
        
          case "DateField":
            this.stack.setSelection([this.stack.getChildren()[7]]);
            break;
        
          case "Desktop":
            this.stack.setSelection([this.stack.getChildren()[8]]);
            break;
        
          case "GroupBox":
            this.stack.setSelection([this.stack.getChildren()[9]]);
            break;
        
          case "HtmlEmbed":
            this.stack.setSelection([this.stack.getChildren()[10]]);
            break;
        
          case "Image":
            this.stack.setSelection([this.stack.getChildren()[11]]);
            break;
        
          case "Label":
            this.stack.setSelection([this.stack.getChildren()[12]]);
            break;
        
          case "List":
            this.stack.setSelection([this.stack.getChildren()[13]]);
            break;
        
          case "Menu":
            this.stack.setSelection([this.stack.getChildren()[14]]);
            break;
        
          case "MenuBar":
            this.stack.setSelection([this.stack.getChildren()[15]]);
            break;
        
          case "Popup":
            this.stack.setSelection([this.stack.getChildren()[16]]);
            break;
        
          case "RadioButton":
            this.stack.setSelection([this.stack.getChildren()[17]]);
            break;
        
          case "RadioButtonGroup":
            this.stack.setSelection([this.stack.getChildren()[18]]);
            break;
        
          case "Resizer":
            this.stack.setSelection([this.stack.getChildren()[19]]);
            break;
        
          case "ScrollBar":
            this.stack.setSelection([this.stack.getChildren()[20]]);
            break;
        
          case "SelectBox":
            this.stack.setSelection([this.stack.getChildren()[21]]);
            break;
        
          case "SlideBar":
            this.stack.setSelection([this.stack.getChildren()[22]]);
            break;
        
          case "Slider":
            this.stack.setSelection([this.stack.getChildren()[23]]);
            break;
        
          case "Spinner":
            this.stack.setSelection([this.stack.getChildren()[24]]);
            break;
        
          case "SplitPane":
            this.stack.setSelection([this.stack.getChildren()[25]]);
            break;
        
          case "StackContainer":
            this.stack.setSelection([this.stack.getChildren()[26]]);
            break;
        
          case "TabView":
            this.stack.setSelection([this.stack.getChildren()[27]]);
            break;
        
          case "TextField":
            this.stack.setSelection([this.stack.getChildren()[28]]);
            break;
        
          case "ToolBar":
            this.stack.setSelection([this.stack.getChildren()[29]]);
            break;
        
          case "Tooltip":
            this.stack.setSelection([this.stack.getChildren()[30]]);
            break;
        
          case "Tree":
            this.stack.setSelection([this.stack.getChildren()[31]]);
            break;
        
          case "Tree Columns":
            this.stack.setSelection([this.stack.getChildren()[32]]);
            break;
        
          case "TreeVirtual":
            this.stack.setSelection([this.stack.getChildren()[33]]);
            break;
        
          case "Window":
            this.stack.setSelection([this.stack.getChildren()[34]]);
            break;
        
          default:
            this.stack.resetSelection();
        }
      }, this);
      
      var tbTop = new qx.ui.toolbar.ToolBar();
      tbTop.set({padding: 5, spacing: 5});
      tbTop.add(new qx.ui.basic.Label("Showcase: ").set({alignY: "middle", font: "bold"}));
      tbTop.add(showcaseButton);
      tbTop.add(new qx.ui.basic.Label("Widgets: ").set({paddingLeft: 10, alignY: "middle", font: "bold"}));
      tbTop.add(widgetButton);
      
      /*
      -------------------------------------------------------------------------
        Document
      -------------------------------------------------------------------------
      */
      var doc = this.getRoot();
      doc.set({blockerColor: '#afafaf', blockerOpacity: 0.4});
      
      var mainContainer = new qx.ui.container.Composite()
      mainContainer.setLayout(new qx.ui.layout.VBox(0));
      
      /*
      -------------------------------------------------------------------------
        Main GroupBox
      -------------------------------------------------------------------------
      */
      
      mainContainer.add(this.createHeader());
      mainContainer.add(tbTop);
      mainContainer.add(stack, {flex: 1});
      
      doc.add(mainContainer, {edge: 0});
      
      /*
      -------------------------------------------------------------------------
        Windows
      -------------------------------------------------------------------------
      */
      var formWindow = this.formWindow = new darktheme.demo.FormWindow("Form Widgets");
      formWindow.addListener("changeActive", this.resetShowcase, this);
      
      var tableWindow = this.tableWindow = new darktheme.demo.TableWindow("Table");
      tableWindow.addListener("changeActive", this.resetShowcase, this);
      
      var editorWindow = this.editorWindow = new darktheme.demo.EditorWindow("HTML Editor");
      editorWindow.addListener("changeActive", this.resetShowcase, this);
      
      var calcWindow = this.calcWindow = new darktheme.demo.CalcWindow();
      calcWindow.addListener("changeActive", this.resetShowcase, this);
      
      var browserWindow = this.browserWindow = new darktheme.demo.BrowserWindow();
      browserWindow.addListener("changeActive", this.resetShowcase, this);
      
      var colorWindow = this.colorWindow = new darktheme.demo.ColorWindow();
      colorWindow.addListener("changeActive", this.resetShowcase, this);
      
    },  
      
    createHeader : function()
    {
      var header = new qx.ui.toolbar.ToolBar();
      header.setDecorator("window-captionbar-active");
      header.setPadding([5, 10, 7, 10]);
      
      var label = new qx.ui.basic.Atom("DarkTheme Demo");
      label.set({alignY: "middle", font: "bold"});
      
      var version = new qx.ui.basic.Atom(qx.core.Setting.get("qx.version"), "darktheme.demo/logo.png");
      version.set({alignY: "middle", font: "bold"});
      
      header.add(label);
      header.addSpacer();
      header.add(version);
    
      return header;
    },
    
    resetShowcase: function()
    {
      switch (true)
      {
        case this.formWindow.getActive():
          this.showcaseButton.setSelection([this.formItem]);
          break;
    
        case this.tableWindow.getActive():
          this.showcaseButton.setSelection([this.tableItem]);
          break;
    
        case this.editorWindow.getActive():
          this.showcaseButton.setSelection([this.editorItem]);
          break;
    
        case this.calcWindow.getActive():
          this.showcaseButton.setSelection([this.calcItem]);
          break;
    
        case this.browserWindow.getActive():
          this.showcaseButton.setSelection([this.browserItem]);
          break;
    
        case this.colorWindow.getActive():
          this.showcaseButton.setSelection([this.colorItem]);
          break;
    
        default:
          this.showcaseButton.setSelection([this.emptyItem]);
      }
    },
    
    closeShowcase: function()
    {
      this.formWindow.close();
      this.tableWindow.close();
      this.editorWindow.close();
      this.calcWindow.close();
      this.browserWindow.close();
      this.colorWindow.close();
      this.resetShowcase();
    }

  }
});
