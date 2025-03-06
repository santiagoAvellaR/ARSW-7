import { Navbar, NavbarBrand } from "@heroui/navbar";
export default function Header() {
  return (
    <Navbar position="static">
            <NavbarBrand className="flex">
            <p className="absolute left-10 font-bold text-blue-500 font-caveat">
            Blueprints</p>
      </NavbarBrand>
    </Navbar>
  );
}