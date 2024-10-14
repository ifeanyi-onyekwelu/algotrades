import { InputLabel, Select, MenuItem } from "@mui/material";

const FormSelect = ({
    label,
    value,
    handleOnChange,
    title,
    menuItems,
}: any) => {
    return (
        <>
            <InputLabel id={label}>{title}</InputLabel>
            <Select
                labelId={label}
                id={label}
                name={label}
                value={value}
                label={title}
                onChange={handleOnChange}
            >
                {menuItems.map((item: any, index: any) => (
                    <MenuItem value={item.value} key={index}>
                        {item.title}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default FormSelect;
