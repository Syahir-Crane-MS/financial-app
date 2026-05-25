import {
    Box,
    Modal,
    Typography,
    FormControl,
    TextField,
    Button,
    Select,
    MenuItem,
    IconButton,
    Divider,
} from "@mui/material";

const Label = ({ children }) => (
    <Typography sx={{ fontSize: 12, color: "gray", mb: 1 }}>
        {children}
    </Typography>
);

const Field = ({ label, error, children, sx }) => (
    <FormControl sx={{ mb: 2, ...sx }} fullWidth>
        <Label>{label}</Label>
        {children}
        {error && (
            <Typography color="error" sx={{ mt: 1, fontSize: 12 }}>
                {error}
            </Typography>
        )}
    </FormControl>
);

export default function ModalFlexible({
    title,
    open,
    setOpen,
    handleClose,
    handleSubmit,
    processing,
    data,
    setData,
    editMode,
    errors,
    clearErrors,
    fields = [],
}) {
    const handleChange = (field) => (e) => {
        setData(field, e.target.value);
        clearErrors(field);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "10px",
                    boxShadow: 24,
                    bgcolor: "white",
                    p: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                    }}
                >
                    {editMode ? "Edit" : "Create"} {title}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            justifyContent: "space-between",
                        }}
                    >
                        {fields.map((field) => (
                            <Field
                                key={field.name}
                                label={field.label || field.name.toUpperCase()}
                                error={errors[field.name]}
                                sx={field.sx}
                            >
                                {field.component === "text" && (
                                    <TextField
                                        value={data[field.name] || ""}
                                        size="small"
                                        type={field.type || "text"}
                                        onChange={handleChange(field.name)}
                                    />
                                )}

                                {field.component === "textArea" && (
                                    <TextField
                                        multiline
                                        rows={3}
                                        value={data[field.name] || ""}
                                        size="small"
                                        type={field.type || "text"}
                                        onChange={handleChange(field.name)}
                                    />
                                )}

                                {field.component === "select" && (
                                    <Select
                                        value={data[field.name] || ""}
                                        size="small"
                                        onChange={handleChange(field.name)}
                                    >
                                        {field.menuItem.map((data, index) => (
                                            <MenuItem
                                                key={index}
                                                value={data.value}
                                            >
                                                {data.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            </Field>
                        ))}
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={processing}
                        sx={{
                            mt: 2,
                            bgcolor: "#36c0a4",
                            color: "white",
                            "&:hover": { bgcolor: "#3d5652" },
                        }}
                    >
                        {editMode ? "Update" : "Submit"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
