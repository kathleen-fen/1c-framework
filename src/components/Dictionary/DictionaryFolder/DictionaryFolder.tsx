import { useQuery } from "@tanstack/react-query";
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
        <DragDropContext onDragEnd={() => {}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Label</TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <TableBody ref={provider.innerRef} {...provider.droppableProps}>
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
    </>
  );
};
