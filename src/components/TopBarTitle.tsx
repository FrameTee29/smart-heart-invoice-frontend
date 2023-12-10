interface TopBarTitleProps {
  title: string;
}

const TopBarTitle = ({ title }: TopBarTitleProps) => {
  return (
    <div className="flex justify-between mt-12 w-full mb-6">
      <div className="text-4xl font-semibold  text-black">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default TopBarTitle;
