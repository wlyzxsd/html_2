import TableRow from "./TableRow";

const TableBody = (props) => {
    return (
        <tbody>
            {props.body.map((item, index) => (
                <tr key={index}>
                    <TableRow row={Object.values(item)} isHead='0' />
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;