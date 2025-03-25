

const ShinnyEffect = ({ left, right, top, size = 300 }: any) => {
  const positionStyles: any = {
    top: `${top}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: -1,
    filter: "blur(100px)",
    opacity: 0.5
  };

  if (left !== undefined) {
    positionStyles.left = `${left}px`;
  }
  if (right !== undefined) {
    positionStyles.right = `${right}px`;
  }

  return <div className="shiny-effect" style={positionStyles}></div>;
};

export default ShinnyEffect;
