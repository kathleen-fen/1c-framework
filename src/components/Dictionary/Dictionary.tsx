import { Grid, Box } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import { useQuery } from "@tanstack/react-query";
import { DictionaryItem } from "@/types";

/* type DictionaryItem = {
  id: string;
  label: string;
  parentId?: string;
  isFolder?: boolean;
  children?: DictionaryItem[];
}; */

/* const getDictionaryItems = async (
  parentId: string | null
): Promise<{ dictionaryItems: DictionaryItem[] }> => {
  const url = `/dictionaryItems?parentId=${parentId ?? ""}`;
  const data = (await fetch(url)).json();
  return data;
}; */

const getDictionaryFolders = async (): Promise<DictionaryItem[]> => {
  const url = `/dictionaryFolders`;
  const data = (await fetch(url)).json();
  return data;
};

export const Dictionary = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["dictionaryFolders"],
    queryFn: getDictionaryFolders,
  });

  /*   useQuery({
    queryKey: ["dictionaryItems", parentId],
    queryFn: async () => {
      const data = await getDictionaryItems(parentId);

      return data;
    },
  }); */

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box sx={{ border: "1px dashed grey" }}>
          {isPending && <div>Loading...</div>}
          {data && (
            <RichTreeView
              items={data}
              /*   onItemExpansionToggle={(event, itemId, isExpanded) => {
              console.log({ event, itemId, isExpanded });
              setParentId(itemId);
            }} */
            />
          )}
          {isError && <div>{error}</div>}
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ border: "1px dashed grey" }}>xs=10</Box>
      </Grid>
    </Grid>
  );
};
