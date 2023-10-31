export default function MarkerDetails({params}) {
    const { id } = params;

    return (
        <div>
            <p>{`MarkerDetails: ${id}`}</p>
        </div>
    );
}
