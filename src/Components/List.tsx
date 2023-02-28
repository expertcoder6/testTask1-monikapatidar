import { Box, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { listProps, userData } from "../Modules/Interfaces";
import instance from "../Services/Index";

const List = ({ term, handleClick }: listProps) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<userData[]>()
    const itemsToShow = 20;
    const [page, setPage] = useState<number>(1)

    const getData = () => {
        instance.get(`todos?search=${term}`)
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getData()
    }, [term])

    const onPageChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
    }

    return (
        <Box>
            {loading && <CircularProgress className="loader" />}
            <Grid justifyContent="center" container spacing={2}>
                {data?.slice((page - 1) * itemsToShow, (page - 1) * itemsToShow + itemsToShow).map((user: userData) => {
                    return (
                        <Grid item xs={4} key={user?.id}>
                            <Card className="data-card">
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography variant="body1">
                                                Id:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography variant="body2">{user?.id}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body1">
                                                UserId:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography variant="body2">{user?.userId}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body1">
                                                Title:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography variant="body2">{user?.title}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body1">
                                                Completed:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Checkbox checked={user?.completed}></Checkbox>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" onClick={() => handleClick(user?.id)}>Click Here</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Pagination count={10} onChange={onPageChange} />
        </Box>
    )
}

export default memo(List);