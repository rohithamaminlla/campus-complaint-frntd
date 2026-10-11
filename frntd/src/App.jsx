import axios from "axios";

function Api() {

    function getMessage() {

        axios.get("http://localhost:8080/home")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <button onClick={getMessage}>Call backend</button>
        </>
    );
}

export default Api;