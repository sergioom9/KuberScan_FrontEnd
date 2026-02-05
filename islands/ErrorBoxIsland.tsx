import ErrorBox from "../components/ErrorBox.tsx";

type PropData = {
    message: string;
}

const ErrorBoxIsland = ({message}:PropData) => {
    if(message===""){
        return null
    }
    return (
        <ErrorBox message={message} />
    );
}  

export default ErrorBoxIsland;