import { useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import ResponsiveCanvas, { type ResponsiveCanvasRef } from "~/components/ResponsiveCanvas";
import Header from "~/components/Header";
import GetBluePrints from "~/components/BluePrints";
import BlueprintsTable from "~/components/BlueprintsTable";
import type { Blueprint } from "~/services/blueprintService";


export const meta: MetaFunction = () => {
  return [
    { title: "BluePrints App" },
    { name: "description", content: "Welcome to BluePrints App!" },
  ];
};

export default function Index() {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const canvasRef = useRef<ResponsiveCanvasRef>(null);
  const handleOpenBlueprint = (bp: Blueprint) => {
    if (canvasRef.current) {
      canvasRef.current.updateCanvas(bp.author, bp.name);
    }
  };

  return (
  <div className="flex flex-col h-screen font-caveat">
  <header>
    <Header />
  </header>
  <main className="flex-1 w-full bg-blue-100 text-black overflow-auto">
    <div className="p-16 ml-8 pb-8 pt-10 sm:p-4">
      <p className="m-2 pl-8 sm:pl-2 text-2xl">BluePrints</p>
      <GetBluePrints setBlueprints={setBlueprints} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto p-2 m-1 gap-4">
      <section className="bg-blue-100 p-4 sm:p-2">
        <div className="m-10 p-8 sm:m-4 sm:p-4">
        <BlueprintsTable blueprints={blueprints} onOpen={handleOpenBlueprint}/>
        </div>
      </section>
      <section className="bg-blue-100 p-4 sm:p-2">
        <ResponsiveCanvas ref={canvasRef} />
      </section>
    </div>
  </main>
  <footer className="flex w-full pl-16 p-4 bg-blue-500 text-white font-bold text-2xl overflow-hidden whitespace-nowrap">
    <p>Lab 6 - Santiago Avellaneda &amp; Miguel Motta</p>
  </footer>
</div>
  );
}