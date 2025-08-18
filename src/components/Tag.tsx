interface TagProps {
  tag: string;
}

export const Tag = ({ tag }: TagProps) => {
  return (
    <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-1 rounded-sm dark:bg-gray-700 dark:text-purple-400 border border-purple-400">
      {tag}
    </span>
  );
};
