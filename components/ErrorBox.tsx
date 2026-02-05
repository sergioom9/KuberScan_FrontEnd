type ErrorProps = {
  message: string;
};

const ErrorBox = ({ message }: ErrorProps) => {
  return (
    <div
      className="alertbox"
      style={{
        marginBottom: "20px",
        borderRadius: "8px",
        padding: "12px 20px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        border: "1px solid red",
        color: "red",
        fontWeight: "500",
      }}
    >
      <span>
        <strong>
          Error : {message}
        </strong>
      </span>
    </div>
  );
};

export default ErrorBox;
