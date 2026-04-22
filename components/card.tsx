import Link from "next/link";

interface CardProps {
  id?: string;
  title: string;
  date: string;
  comp: string;
}

export default function Card({ id = "1", title, date, comp }: CardProps) {
  return (
    <Link href={`/posts/${id}`} className="block w-full">
      <div className="w-full bg-[#080d0a] border border-white/5 rounded-xl p-5 hover:bg-[#0c1410] hover:border-primary/20 transition-all duration-300">
        <h2 className="text-lg font-bold mb-1.5 text-white transition-colors">
          {title}
        </h2>

        <div className="text-sm text-gray-500">
          <span>{date}</span>
          <span className="mx-2">·</span>
          <span>{comp}</span>
        </div>
      </div>
    </Link>
  );
}
