import { Box, Grid, TextField } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import List from "./List";

const Container = () => {

    const [term, setTerm] = useState("")

    const handleChange = useCallback(
        debounce(e => setTerm(e.target.value), 2000),
        [],
    );

    const handleClick = useCallback((id: any) => {
        console.log("ID", id)
    }, [term]);

    return (
        <>
            <Box marginY={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={2} maxWidth="xl" sx={{ justifyContent: 'center' }}>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" variant="outlined" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <List term={term} handleClick={handleClick} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Container;