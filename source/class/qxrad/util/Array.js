/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("qxrad.util.Array",
{
  extend : qx.core.Object,

  statics :
  {
    /*
         *
            {
                "name": "root",
                "children": [
                    {
                        "name": "1",
                        "children": [
                            {
                                "name": "1.1"
                            },
                            {
                                "name": "1.2"
                            },
                            {
                                "name": "1.3"
                            }
                        ]
                    },
                    {
                        "name": "2",
                        "children": []
                    }
                ]
            }
         *
         */

    /**
     * TODOC
     *
     * @param tree {var} TODOC
     * @param array {var} TODOC
     * @return {void}
     * @throws TODOC
     */
    arrayToMapTree : function(tree, array)
    {
      if (!tree.name)
      {
        tree["name"] = array[0];
        tree["children"] = [];
      }
      else
      {
        // Check names are equal (for the unique root of tree).
        if (tree.name != array[0]) {
          throw new Error("Your root name is not equal !!! (" + tree.name + "!=" + array[0] + ")");
        }
      }

      // Start after the root tree.
      for (var i=1, length=array.length; i<length; i++)
      {
        var index = null;

        // Check exist key.
        for (var k=0, lk=tree["children"].length; k<lk; k++)
        {
          if (tree["children"][k].name == array[i])
          {
            index = k;
            break;
          }
        }

        // Key not found.
        if (index == null)
        {
          tree["children"].push(
          {
            "name"     : array[i],
            "children" : []
          });

          index = tree["children"].length - 1;
        }

        tree = tree["children"][index];
      }
    }
  }
});