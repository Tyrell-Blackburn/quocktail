import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner({loading}) {
    return (
        <>
            <ClipLoader
                color={`#0066ff`}
                loading={loading}
                size={250}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>
    )
}