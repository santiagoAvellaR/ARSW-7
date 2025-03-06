import { Navbar, NavbarBrand, NavbarContent,NavbarItem } from "@heroui/navbar";
export default function Header() {
  return (
    <Navbar position="static">
            <NavbarBrand className="flex">

        <p className="absolute left-10 font-bold text-blue-500 text-red-500">Blueprints</p>
      </NavbarBrand>
      
    </Navbar>
  );
}

<NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem isActive>
            Customers
        </NavbarItem>
      
      </NavbarContent>