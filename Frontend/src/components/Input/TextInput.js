import "./TextInput.scss";

export const TextInput = (props) => {
  return (
    <div className="textInput_container">
      <form onSubmit={props.handleOnSubmit}>
        <label>
          <input
            className="textInput_content"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleOnChange}
            // onChange={()=>{console.log(props);}}
          />
        </label>
      </form>
    </div>
  );
};
