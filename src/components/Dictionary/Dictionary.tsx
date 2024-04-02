import { Grid, Box } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import { TreeItem } from "@mui/x-tree-view";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

export const Dictionary = () => {
  const [items, setItems] = useState<object>({}); // fix any
  const [parentId, setParentId] = useState<string | null>(null);

  const transformArrayToObject = (items: TreeViewBaseItem[]) => {
    return items.reduce((obj, item) => {
      return {
        ...obj,
        [item.id]: { ...item },
      };
    }, {});
  };

  const transformItemsToTree = (items: object, rootParentId: string | null) => {
    const itemsArray = cloneDeep(Object.values(items));
    const tree = itemsArray
      .filter((item) => item.parentId === (rootParentId ?? undefined))
      .map((item) => {
        return { ...item, children: transformItemsToTree(items, item.id) };
      });
    /*    tree.forEach((node) => {
      const children = itemsArray.filter((child) => child.parentId === node.id);
      node.children = children.length ? children : undefined;
    }); */
    return tree;
  };

  useEffect(() => {
    const url = `/dictionaryItems?parentId=${parentId ?? ""}`;

    fetch(url).then((res) => {
      res.json().then((data) => {
        const itemsObject = transformArrayToObject(data.dictionaryItems);
        console.log("itemsObject: ", { ...itemsObject });

        setItems((prevItems) => ({ ...prevItems, ...itemsObject })); // fix duplicate parents
      });
    });
  }, [parentId]);

  useEffect(() => {
    console.log("items: ", items);
    console.log(transformItemsToTree(items, null));
  }, [items]);

  const renderTree: React.FC<{ nodes: TreeViewBaseItem }> = ({ nodes }) => (
    <TreeItem key={nodes.id} itemId={nodes.id} label={nodes.label}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree({ nodes: node }))
        : null}
    </TreeItem>
  );
  /* const ITEMS: TreeViewBaseItem[] = [
    { id: "2", label: "Hello" },
    {
      id: "3",
      label: "Subtree with children",
      children: [
        { id: "6", label: "Hello" },
        {
          id: "7",
          label: "Sub-subtree with children",
          children: [
            { id: "9", label: "Child 1" },
            { id: "10", label: "Child 2" },
            { id: "11", label: "Child 3" },
          ],
        },
        { id: "8", label: "Hello" },
      ],
    },
    { id: "4", label: "World" },
    { id: "5", label: "Something something" },
  ]; */
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box sx={{ border: "1px dashed grey" }}>
          <RichTreeView
            items={transformItemsToTree(items, null)}
            onItemExpansionToggle={(event, itemId, isExpanded) => {
              console.log({ event, itemId, isExpanded });
              setParentId(itemId);
            }}
          />
          {/*   <SimpleTreeView onItemExpansionToggle={()=>{

          }}>
            {transformItemsToTree(items, null).map((item) =>
              renderTree({ nodes: item })
            )}
          </SimpleTreeView> */}
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ border: "1px dashed grey" }}>xs=10</Box>
      </Grid>
    </Grid>
  );
};
