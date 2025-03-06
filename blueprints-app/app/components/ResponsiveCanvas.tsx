import React, { useRef, useState, useEffect } from "react";

interface ResponsiveCanvasProps {
  // Resolución "interna" del canvas (puedes ajustarla según tu gusto)
  internalWidth?: number;
  internalHeight?: number;

  // Callback opcional para cuando el usuario guarde el dibujo
  onSave?: (dataUrl: string) => void;

  // DataURL de un dibujo guardado, para re-pintarlo
  initialDrawing?: string;
}

const ResponsiveCanvas: React.FC<ResponsiveCanvasProps> = ({
  internalWidth = 800,
  internalHeight = 600,
  onSave,
  initialDrawing
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 1. Inicializamos el contexto
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

  // 2. Pintar un dibujo inicial (si viene por props)
  useEffect(() => {
    if (initialDrawing && ctx) {
      const image = new Image();
      image.src = initialDrawing;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
    }
  }, [initialDrawing, ctx]);

  // Función auxiliar para obtener coords ajustadas al escalado
  const getRelativeCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    // Factor de escala entre el tamaño "interno" y el tamaño "visual"
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // 3. Inicio de trazo
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    setIsDrawing(true);

    const { x, y } = getRelativeCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // 4. Dibujo continuo
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    const { x, y } = getRelativeCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // 5. Fin del trazo
  const handleMouseUp = () => {
    setIsDrawing(false);
    ctx?.closePath();
  };

  // 6. Guardar el dibujo como DataURL
  const handleSave = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onSave?.(dataUrl);
  };

  // 7. Limpiar el lienzo
  const handleClear = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div style={{ width: "100%", maxWidth: 800 /* o lo que desees */ }}>
      <canvas
        ref={canvasRef}
        // El "tamaño interno" del canvas (resolución)
        width={internalWidth}
        height={internalHeight}
        // Escalado visual: ancho completo, alto automático
        style={{ 
          width: "100%", 
          height: "auto", 
          border: "1px solid #ccc", 
          cursor: "crosshair" 
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDrawing(false)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleSave}>Guardar</button>
        <button onClick={handleClear}>Limpiar</button>
      </div>
    </div>
  );
};

export default ResponsiveCanvas;
