import useStockCalls from "../hooks/useStockCalls";
// import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { btnHoverStyle, flexCenter } from "../styles/globalStyles";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import useSortColumn from "../hooks/useSortColumn";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Products = () => {
  const { getBrands, getCategories, getProducts, deleteProduct } =
    useStockCalls();
  const { products, brands } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const columnObj = {
    brand: 1,
    name: 1,
    stock: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(
    products,
    columnObj
  );

  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
  }, []);

  const isBrandSelected = (item) =>
    selectedBrands.includes(item.brand) || selectedBrands.length === 0;

  const isProductSelected = (item) =>
    selectedProducts.includes(item.name) || selectedProducts.length === 0;

  const filteredProducts = products
    ?.filter((item) => selectedBrands.includes(item.brand))
    .map((item) => item.name);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Products
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)} color="success">
        Add New Product
      </Button>

      <Box sx={flexCenter} mt={3}>
        <MultiSelectBox
          handleSelect={(item) => setSelectedBrands(item)}
          placeholder="Select Brand"
        >
          {brands?.map((item) => (
            <MultiSelectBoxItem
              key={item.name}
              value={item.name}
              text={item.name}
            />
          ))}
        </MultiSelectBox>

        <MultiSelectBox
          handleSelect={(item) => setSelectedProducts(item)}
          placeholder="Select Product"
        >
          {filteredProducts?.map((item) => (
            <MultiSelectBoxItem key={item} value={item} text={item} />
          ))}
        </MultiSelectBox>
      </Box>

      {sortedData?.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("brand", "text")}
                  >
                    <div>Brand</div>
                    {columns.brand === 1 && <UpgradeIcon />}
                    {columns.brand !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("name", "text")}
                  >
                    <div>Name</div>
                    {columns.name === 1 && <UpgradeIcon />}
                    {columns.name !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <div>Stock</div>
                    {columns.stock === 1 && <UpgradeIcon />}
                    {columns.stock !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                ?.filter((item) => isBrandSelected(item))
                .filter((item) => isProductSelected(item))
                .map((product, index) => (
                  <TableRow
                    key={product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.brand}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell
                      align="center"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <DeleteIcon sx={btnHoverStyle} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
