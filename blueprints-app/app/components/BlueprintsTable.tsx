import { Button } from "@heroui/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/table";
export default function BlueprintsTable(props: { author:string}) {
    console.log(props.author);
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
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>607</TableCell>
          <TableCell><Button fullWidth
          color="primary"
          variant="bordered" >Open
          </Button></TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>69</TableCell>
          <TableCell><Button fullWidth
          color="primary"
          variant="bordered" >Open
          </Button></TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>892</TableCell>
          <TableCell><Button fullWidth
          color="primary"
          variant="bordered" >Open
          </Button></TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>784</TableCell>
          <TableCell><Button fullWidth
          color="primary"
          variant="bordered" >Open
          </Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}