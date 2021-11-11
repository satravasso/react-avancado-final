import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { DataGrid, GridApi, GridCellValue } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import { getPosts, deletePost } from "../services/api";
import { useHistory } from "react-router";

function ButtonUpdate(props: any) {
  const history = useHistory();

  function handleUpdate(e: any) {
    e.stopPropagation();
    history.push(`/create/${props.id}`);
  }
  return <Button onClick={handleUpdate}>Alterar</Button>;
}
function ButtonDelete(props: any) {
  const { id, row } = props;
  async function handleDelete(e: any) {
    e.stopPropagation();
    await deletePost(id);
    row.setRows((curr: any) => curr.filter((row: any) => row.id !== id));
  }
  return <Button onClick={handleDelete}>Delete</Button>;
}

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "title", headerName: "Título", width: 100 },
  { field: "content", headerName: "Conteúdo", width: 350 },
  { field: "createdAt", headerName: "Data de criação", width: 150 },
  {
    field: "action",
    headerName: "Alterar",
    sortable: false,
    renderCell: ButtonUpdate,
  },
  {
    field: "delete",
    headerName: "Deletar",
    sortable: false,
    renderCell: ButtonDelete,
  },
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
      blog.setRows = setRows;
      return blog;
    });

    setRows(data);
  }

  return (
    <Container component="main">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Posts
        </Typography>

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
