import { useMutation, useQuery } from "@tanstack/react-query";
import { DictionaryItem } from "@/types";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import FolderIcon from "@mui/icons-material/Folder";
import { useQueryClient } from "@tanstack/react-query";

const getDictionaryItems = async (
  parentId?: string
): Promise<DictionaryItem[]> => {
  const url = `/dictionaryItems?parentId=${parentId ?? ""}`;
  const data = (await fetch(url)).json();
  return data;
};

type DictionaryFolderProps = {
  parentId?: string;
};

export const DictionaryFolder = ({ parentId }: DictionaryFolderProps) => {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["dictionaryItems", parentId],
    queryFn: async () => getDictionaryItems(parentId),
  });

  const updateOrder = async (data: DictionaryItem[]) => {
    const url = `/dictionaryItems/updateOrder`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const mutation = useMutation({
    mutationFn: updateOrder,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["dictionaryItems", parentId],
      });
      const previousData = queryClient.getQueryData([
        "dictionaryItems",
        parentId,
      ]);
      queryClient.setQueryData(["dictionaryItems", parentId], newData);
      console.log("previousData: ", previousData);
      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["dictionaryItems", parentId],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["dictionaryItems", parentId],
      });
    },
  });

  const handleDragEnd = (e) => {
    if (!e.destination || !data) return;
    const tempData = [...data];
    const [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    tempData.forEach((item, index) => {
      item.order = index;
    });
    // queryClient.setQueryData(["dictionaryItems", parentId], tempData);
    mutation.mutate(tempData);
  };

  return (
    <>
      {isPending && <div>Loading...</div>}
      {data && (
        <Box>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Label</TableCell>
                </TableRow>
              </TableHead>
              <Droppable droppableId="droppable-1">
                {(provider) => (
                  <TableBody
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                  >
                    {data?.map((row, index) => (
                      <Draggable
                        key={row.label}
                        draggableId={row.label}
                        index={index}
                      >
                        {(provider) => (
                          <TableRow
                            key={row.label}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              {...provider.dragHandleProps}
                            >
                              <FolderIcon />
                            </TableCell>
                            <TableCell>{row.label}</TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provider.placeholder}
                  </TableBody>
                )}
              </Droppable>
              <TableBody></TableBody>
            </Table>
          </DragDropContext>
        </Box>
      )}
    </>
  );
};
