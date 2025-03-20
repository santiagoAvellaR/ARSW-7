import { Button } from "@heroui/button";
import type React from "react";
import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { fetchBlueprint, type Blueprint } from "../services/blueprintService";
import CreateBlueprint from "~/components/Createblueprint";
import { getCurrentBlueprint } from "./BlueprintsTable";
import { updateBlueprint } from "../services/blueprintService";

interface ResponsiveCanvasProps {
  internalWidth?: number;
  internalHeight?: number;
  onSave?: (dataUrl: string) => void;
  initialDrawing?: string;
}



export interface ResponsiveCanvasRef {
  updateCanvas: (author: string, bpname: string) => void;
  getDrawnPoints: () => { x: number; y: number }[];
}

const ResponsiveCanvas = forwardRef<ResponsiveCanvasRef, ResponsiveCanvasProps>(
  ({ internalWidth = 800, internalHeight = 600 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          context.lineWidth = 2;
          context.lineCap = "round";
          context.strokeStyle = "#000";
          setCtx(context);
        }
      }
    }, []);

    const getRelativeCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return { x: 0, y: 0 };
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!ctx) return;
      setIsDrawing(true);
      const { x, y } = getRelativeCoords(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      setPoints([{ x, y }]);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !ctx) return;
      const { x, y } = getRelativeCoords(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      setPoints((prevPoints) => [...prevPoints, { x, y }]);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      ctx?.closePath();
    };

    const handleClear = () => {
      if (!ctx || !canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setPoints([]);
    };

    const getDrawnPoints = () => points;

    const updateCanvas = async (author: string, bpname: string) => {
      if (!ctx || !canvasRef.current) return;
      try {
        const blueprint: Blueprint = await fetchBlueprint(author, bpname);
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (blueprint.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
          blueprint.points.forEach(({ x, y }) => {
            ctx.lineTo(x, y);
          });
          ctx.stroke();
          ctx.closePath();
          blueprint.points.forEach(({ x, y }) => {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
          });
        }
      } catch (error) {
        console.error("Error loading blueprint:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      updateCanvas,
      getDrawnPoints,
    }));

    return (
      <div style={{ width: "100%", maxWidth: "40rem" }}>
        <CreateBlueprint getCoordinates={getDrawnPoints} />
        <p className="text-2xl m-2">Blueprint</p>
        <canvas
          ref={canvasRef}
          width={internalWidth}
          height={internalHeight}
          style={{
            width: "100%",
            height: "auto",
            border: "1px solid #ccc",
            cursor: "crosshair",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDrawing(false)}
        />
        <div className="mt-5 flex gap-[1rem]">
          <Button color="primary" variant="shadow" onPress={handleClear}>
            Clean
          </Button>
          <Button color="success" onPress={ async () => {
            const bp = getCurrentBlueprint();
            if (bp) {
              await updateBlueprint({ ...bp, points: bp.points.concat(getDrawnPoints()) });
            } else {
              alert("No blueprint selected, please select one from the table or create one.");
            }
          }}>
            Save / Update
          </Button>
        </div>
      </div>
    );
  }
);

export default ResponsiveCanvas;
