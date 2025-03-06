// app/components/DrawingCanvas.tsx

import React, { useRef, useState, useEffect } from "react";

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  // Callback opcional para cuando el usuario guarde el dibujo
  onSave?: (dataUrl: string) => void;
  // Opcional: dataUrl de un dibujo guardado, para re-pintarlo
  initialDrawing?: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width = 500,
  height = 300,
  onSave,
  initialDrawing
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // 1. Obtener el contexto 2D del canvas al montar el componente
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Ajustamos algunos estilos de línea (grosor, color, etc.)
        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = "#000000";
        setCtx(context);
      }
    }
  }, []);

  // 2. Cargar un dibujo inicial (si lo hay) al montar
  useEffect(() => {
    if (initialDrawing && ctx) {
      const image = new Image();
      image.src = initialDrawing;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
    }
  }, [initialDrawing, ctx]);

  // 3. Función que inicia el trazo
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    setIsDrawing(true);

    // Coordenadas relativas dentro del canvas
    const { offsetX, offsetY } = e.nativeEvent;
    // Arrancamos el path y movemos el "lápiz" a la posición inicial
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  // 4. Función que dibuja mientras se mueve el mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  // 5. Función que termina el trazo
  const handleMouseUp = () => {
    setIsDrawing(false);
    // Cerramos el path (opcional)
    ctx?.closePath();
  };

  // 6. Guardar el dibujo como DataURL
  const handleSave = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onSave?.(dataUrl);
  };

  // 7. Limpiar el canvas (opcional)
  const handleClear = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: "1px solid #ccc", cursor: "crosshair" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        // Para usuarios que arrastran el mouse fuera del canvas
        onMouseLeave={() => setIsDrawing(false)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleSave}>Guardar</button>
        <button onClick={handleClear}>Limpiar</button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
