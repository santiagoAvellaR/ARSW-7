import { Button } from "@heroui/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/table";
import type { Blueprint } from "~/services/blueprintService";
import { deleteBlueprint} from "~/services/blueprintService";
interface BlueprintsTableProps {
  blueprints: Blueprint[];
  onOpen: (bp: Blueprint) => void;
}

export default function BlueprintsTable({ blueprints, onOpen }: BlueprintsTableProps) {
  const onDelete =async (bp: Blueprint) => {
    await deleteBlueprint(bp.author, bp.name);
    
  };
  return (    
    <Table 
    aria-label="Example static collection table" 
    isStriped color="primary"
    selectionMode="single"
    
    >
      <TableHeader>
        <TableColumn>Blueprint Name</TableColumn>
        <TableColumn>Number of points</TableColumn>
        <TableColumn>View</TableColumn>
      </TableHeader>
      <TableBody>
      {blueprints.map((bp, index) => (
          <TableRow key={index}>
            <TableCell>{bp.name}</TableCell>
            <TableCell>{bp.points.length}</TableCell>
            <TableCell>
            <Button 
                fullWidth
                color="primary"
                variant="bordered"
                onPress={() => onOpen(bp)}
              >Open
              </Button>
              <Button className="mt-5"
                fullWidth
                color="danger"
                variant="bordered"
                onPress={() => onDelete(bp)}
              >Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}