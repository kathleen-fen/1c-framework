import { Grid, Box } from "@mui/material";

import { DictionaryTree } from "./DictionaryTree/DictionaryTree";
import { DictionaryFolder } from "./DictionaryFolder/DictionaryFolder";
import { useState } from "react";

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

export const Dictionary = () => {
  const [activeParentId, setActiveParentId] = useState<string | undefined>(
    undefined
  );
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
        <DictionaryTree changeParentId={(id) => setActiveParentId(id)} />
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ border: "1px dashed grey" }}>
          <DictionaryFolder parentId={activeParentId} />
        </Box>
      </Grid>
    </Grid>
  );
};
