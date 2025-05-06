import { useRef } from "react";

function AssinaturaCanvas({ onChange }) {
  const canvasRef = useRef(null);

  const desenhar = (ctx, e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const iniciar = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();

    desenhar(ctx, e.nativeEvent);
    canvas.onmousemove = (event) => desenhar(ctx, event);
  };

  const parar = () => {
    const canvas = canvasRef.current;
    canvas.onmousemove = null;
    const assinatura = canvas.toDataURL("image/png");
    onChange(assinatura);
  };

  const limpar = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={100}
        className="border border-gray-400 rounded mb-2 bg-white"
        onMouseDown={iniciar}
        onMouseUp={parar}
      />
      <button
        type="button"
        onClick={limpar}
        className="text-sm text-blue-600 hover:underline"
      >
        Limpar assinatura
      </button>
    </div>
  );
}

export default AssinaturaCanvas;

