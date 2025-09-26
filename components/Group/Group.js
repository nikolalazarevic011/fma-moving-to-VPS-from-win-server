export const Group = ({
  className,
  children,
}) => {
  return (
    <div className={`group mb-2 ${className}`}>
      {children}
    </div>
  );
};
