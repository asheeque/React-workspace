const HeaderContent = ({ type, children }) => {
  const Component = type;

  return <Component>{children}</Component>;
};

export default HeaderContent;
