import { Navbar, NavbarBrand } from "@heroui/navbar";
export default function Header() {
  return (
    <Navbar className="justify-start pl-8 bg-blue-500 text-white font-bold">
      <NavbarBrand className="pl-0">
        <p className=" text-2xl">ARSW - Blueprints</p>
      </NavbarBrand>
    </Navbar>
  );
}