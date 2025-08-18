interface TagProps {
  tag: string;
}

export const Tag = ({ tag }: TagProps) => {
  return (
    <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-1 rounded-sm  border border-purple-400">
      {tag}
    </span>
  );
};
