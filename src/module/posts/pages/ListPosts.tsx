import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import { getPosts, deletePost } from "../services/api";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "title", headerName: "Título", width: 100 },
  { field: "content", headerName: "Conteúdo", width: 350 },
  { field: "createdAt", headerName: "Data de criação", width: 150 },
];

function ListMoviePage() {
  const [rows, setRows] = useState([]);
  const [rowsSelected, setRowsSelected] = useState<any>();

  useEffect(() => {
    document.title = "Listar";
    getPostsFromApi();
  }, []);

  async function getPostsFromApi() {
    const response: any = await getPosts();
    const data = response.data.map((blog: any) => {
      blog.id = blog.id;
      return blog;
    });

    setRows(data);
  }

  async function handleClickDelete() {
    console.log(rowsSelected);
    await deletePost(rowsSelected[0]);
    await getPostsFromApi();
  }

  return (
    <Container component="main">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Posts
        </Typography>
        <Button onClick={handleClickDelete} color="error" variant="contained">
          Deletar
        </Button>
        <div style={{ height: 600, width: "100%", marginTop: 10 }}>
          <DataGrid
            columns={columns}
            rows={rows}
            checkboxSelection
            onSelectionModelChange={(selectionModel) => {
              setRowsSelected(selectionModel);
            }}
          />
        </div>
      </Box>
    </Container>
  );
}

export default ListMoviePage;
