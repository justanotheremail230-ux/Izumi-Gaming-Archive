type GameCardProps = {
  title: string;
  image: string;
  subtitle?: string;
};

export default function GameCard({
  title,
  image,
  subtitle,
}: GameCardProps) {
  return (
    <div
      className="
        min-w-[180px]
        bg-zinc-900/60
        backdrop-blur-xl
        border
        border-zinc-800
        rounded-3xl
        overflow-hidden
        hover:border-cyan-400/40
        hover:shadow-[0_0_25px_rgba(22,188,249,0.15)]
        transition-all
        duration-300
      "
    >
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg">
          {title}
        </h3>

        {subtitle && (
          <p className="text-zinc-500 text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}