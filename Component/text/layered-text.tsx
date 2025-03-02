interface LayeredTextProps {
  text: string;
}

export default function LayeredText({ text }: LayeredTextProps) {
  return (
    <span className="relative text-[5rem] font-black uppercase tracking-wide">
      {/* Layered Colors */}
      <span className="absolute top-[6px] left-[-6px] text-blue-600 skew-x-[-5deg]">
        {text}
      </span>
      <span className="absolute top-[12px] left-[-12px] text-pink-500 skew-x-[-5deg]">
        {text}
      </span>
      <span className="absolute top-[18px] left-[-18px] text-yellow-500 skew-x-[-5deg]">
        {text}
      </span>

      {/* Top Layer (White Text) */}
      <span className="relative text-white skew-x-[-5deg]">{text}</span>
    </span>
  );
}
