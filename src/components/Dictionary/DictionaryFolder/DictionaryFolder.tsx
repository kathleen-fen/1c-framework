import { useQuery } from "@tanstack/react-query";
import { DictionaryItem } from "@/types";
import { Box } from "@mui/material";

const getDictionaryItems = async (
  parentId?: string
): Promise<{ dictionaryItems: DictionaryItem[] }> => {
  const url = `/dictionaryItems?parentId=${parentId ?? ""}`;
  const data = (await fetch(url)).json();
  return data;
};

type DictionaryFolderProps = {
  parentId?: string;
};

export const DictionaryFolder = ({ parentId }: DictionaryFolderProps) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["dictionaryItems", parentId],
    queryFn: async () => getDictionaryItems(parentId),
  });
  return (
    <>
      {isPending && <div>Loading...</div>}
      <Box>
        {data?.map((item) => (
          <div key={item.id}>{item.label}</div>
        ))}
      </Box>
    </>
  );
};
