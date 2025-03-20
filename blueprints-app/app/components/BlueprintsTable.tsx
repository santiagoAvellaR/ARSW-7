import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import type { Blueprint } from "~/services/blueprintService";
import { deleteBlueprint } from "~/services/blueprintService";

interface BlueprintsTableProps {
  blueprints: Blueprint[];
  onOpen: (bp: Blueprint) => void;
}

let currentBlueprint: Blueprint | null = null;

export function setCurrentBlueprint(bp: Blueprint) {
  currentBlueprint = bp;
}

export function getCurrentBlueprint(): Blueprint | null {
  return currentBlueprint;
}

export default function BlueprintsTable({ blueprints, onOpen }: BlueprintsTableProps) {
  const [localBlueprints, setLocalBlueprints] = useState<Blueprint[]>(blueprints);

  // Actualiza el estado local si la prop blueprints cambia
  useEffect(() => {
    setLocalBlueprints(blueprints);
  }, [blueprints]);

  const onDelete = async (bp: Blueprint) => {
    await deleteBlueprint(bp.author, bp.name);
    setLocalBlueprints((prev) =>
      prev.filter((item) => item.author !== bp.author || item.name !== bp.name)
    );
  };

  const handleOpen = (bp: Blueprint) => {
    setCurrentBlueprint(bp);
    onOpen(bp);
  }


  return (
    <Table aria-label="Blueprints table" isStriped color="primary" selectionMode="single">
      <TableHeader>
        <TableColumn>Blueprint Name</TableColumn>
        <TableColumn>Number of points</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {localBlueprints.map((bp) => (
          <TableRow key={`${bp.author}-${bp.name}`}>
            <TableCell>{bp.name}</TableCell>
            <TableCell>{bp.points.length}</TableCell>
            <TableCell>
              <Button
                fullWidth
                color="primary"
                variant="bordered"
                onPress={() => handleOpen(bp)}
              >
                Open
              </Button>
              <Button
                className="mt-5"
                fullWidth
                color="danger"
                variant="bordered"
                onPress={() => onDelete(bp)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
