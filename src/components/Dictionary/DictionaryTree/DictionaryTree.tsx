import { Box } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import { useQuery } from "@tanstack/react-query";
import { DictionaryItem } from "@/types";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import exp from "constants";

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

type DictionaryTreeProps = {
  changeParentId: (parentId?: string) => void;
};
export const DictionaryTree = ({ changeParentId }: DictionaryTreeProps) => {
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
    <Box sx={{ border: "1px dashed grey" }}>
      {isPending && <div>Loading...</div>}
      {data && (
        <RichTreeView
          items={data}
          onItemFocus={(event, item) => {
            console.log({ event, item });
            changeParentId(item);
          }}
          slots={{
            collapseIcon: FolderOpenIcon,
            expandIcon: FolderIcon,
            endIcon: FolderIcon,
          }}

          /*   onItemExpansionToggle={(event, itemId, isExpanded) => {
              console.log({ event, itemId, isExpanded });
              setParentId(itemId);
            }} */
        />
      )}
      {isError && <div>{error}</div>}
    </Box>
  );
};
