interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="container mx-auto my-10">{children}</div>;
};

export default Container;
