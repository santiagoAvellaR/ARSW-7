import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Form,
  Input
} from "@heroui/react";
import { type Blueprint, createBlueprint, type Point } from "~/services/blueprintService";

interface CreateBlueprintProps {
  getCoordinates: () => Point[];
}

export default function CreateBlueprint({ getCoordinates }: CreateBlueprintProps) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState<"opaque" | "blur" | "transparent" | undefined>("opaque");

  const buttonInfo= 'Create Blueprint';

  const handleOpen = (backdrop: React.SetStateAction<"opaque" | "blur" | "transparent" | undefined>) => {
    setBackdrop(backdrop);
    onOpen();
  };


  const onSubmit = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    createData({
      author: formData.author?.toString() || "",
      bpname: formData.bpname?.toString() || ""
    }, getCoordinates);
    onClose();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
          <Button
            key={buttonInfo}
            className="capitalize"
            color="primary"
            variant="solid"
            onPress={() => handleOpen('blur')}
          >
            {buttonInfo}
          </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Blueprint Name</ModalHeader>
              <ModalBody>
              <Form
                className="w-full max-w-xs flex flex-col gap-3"
                onSubmit={onSubmit}
              >
                <Input
                  labelPlacement="outside"
                  name="author"
                  required
                  placeholder="Enter author"
                />
                <Input
                  labelPlacement="outside"
                  name="bpname"
                  required
                  placeholder="Enter blueprint name"
                />
                <Button type="submit" variant="flat">
                  Submit
                </Button>
              </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function spawnAlert(message: string, type: "success" | "danger") {
  console.log(`Debería lanzar una alerta: ${message} ${type}`)
}

async function createData(data: { author: string; bpname: string; }, getCoordinates: () => Point[]) {
  const currentPoints: Point[] = getCoordinates();
  const bp:Blueprint = {
    name: data.bpname,
    author: data.author,
    points: currentPoints
  }

  createBlueprint(bp).then(() => {
    spawnAlert("Blueprint created successfully", 'success');
  }).catch(
    (error) => {
      spawnAlert(error.message, 'danger');
    }
  );
}