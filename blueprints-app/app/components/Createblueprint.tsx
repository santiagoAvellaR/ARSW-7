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

export default function CreateBlueprint() {
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
    }, onClose);
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

async function createData(data: { author: string; bpname: string; }, onClose: () => void) {
  
  const currentPoints: Point[] = [{x:1,y:1}, {x:2,y:2}, {x:3,y:3}]; // Mocked data

  const bp:Blueprint = {
    name: data.bpname,
    author: data.author,
    points: currentPoints
  }
  console.log(`Here it should post the current Blueprint on the Canvas ${JSON.stringify(bp)}`)
  await createBlueprint(bp);
  onClose();
  
}