import "./ButtonS1.scss";

export const ButtonS1 = (props) => {
  const { text } = props;
  return (
    <div className="buttonS1__container" onClick={props.handleOnClick}>
      {text}
    </div>
  );
};
