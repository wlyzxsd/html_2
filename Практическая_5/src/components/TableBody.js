import TableRow from "./TableRow";

const TableBody = (props) => {
    return (
        <tbody>
            {props.body.map((item, index) => (
                <tr key={index}>
                    {Object.values(item).map((value, i) => (
                        <td key={i}> {value} </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;