import { Button } from "@heroui/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/table";
import type { Blueprint } from "~/services/blueprintService";
export default function BlueprintsTable(props: { blueprints:Blueprint[] }) {
  const blueprints = props.blueprints;  
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
                onPress={() => console.log(bp.points)}
              >Open
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}