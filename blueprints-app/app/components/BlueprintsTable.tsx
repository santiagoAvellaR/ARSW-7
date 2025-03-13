import { Button } from "@heroui/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/table";
export default function BlueprintsTable(props: { blueprints:Map<string, string> }) {
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
        {Array.from(blueprints.keys()).map((key) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>{blueprints.get(key)}</TableCell>
            <TableCell>
              <Button fullWidth
              color="primary"
              variant="bordered" >Open
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
<TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>784</TableCell>
          <TableCell><Button fullWidth
          color="primary"
          variant="bordered" >Open
          </Button></TableCell>
        </TableRow>
      </TableBody>
*/