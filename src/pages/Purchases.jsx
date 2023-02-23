import useStockCalls from "../hooks/useStockCalls";
// import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
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
import EditIcon from "@mui/icons-material/Edit";
import { btnHoverStyle, flexCenter } from "../styles/globalStyles";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import useSortColumn from "../hooks/useSortColumn";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import PurchaseModal from "../components/modals/PurchaseModal";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Purchases = () => {
  const {
    deletePurchase,
    putPurchase,
    postPurchase,
    getCategories,
    getProCatBrnd,
    getFirms,
  } = useStockCalls();
  const { products, brands, purchases, categories } = useSelector(
    (state) => state.stock
  );
  const [open, setOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [info, setInfo] = useState({});

  const columnObj = {
    brand: 1,
    product: 1,
    firm: 1,
    amount: 1,
    date: 1,
    quantity: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(
    purchases,
    columnObj
  );

  useEffect(() => {
    getProCatBrnd();
    getCategories();
    getFirms();
  }, []);

  const isBrandSelected = (item) =>
    selectedBrands.includes(item.brand) || selectedBrands.length === 0;

  const isProductSelected = (item) =>
    selectedProducts.includes(item.name) || selectedProducts.length === 0;

  const filteredProducts = products
    ?.filter((item) => selectedBrands.includes(item.brand))
    .map((item) => item.name);

  // console.log(selectedBrands);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Purchases
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)} color="success">
        New Purchase
      </Button>

      <PurchaseModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

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
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("brand", "text")}
                  >
                    <div>Date</div>
                    {columns.date === 1 && <UpgradeIcon />}
                    {columns.date !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("brand", "text")}
                  >
                    <div>Firm Name</div>
                    {columns.firm === 1 && <UpgradeIcon />}
                    {columns.firm !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("name", "text")}
                  >
                    <div>Brand Name</div>
                    {columns.brand === 1 && <UpgradeIcon />}
                    {columns.brand !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <div>Product</div>
                    {columns.product === 1 && <UpgradeIcon />}
                    {columns.product !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <div>Product Name</div>
                    {columns.product === 1 && <UpgradeIcon />}
                    {columns.product !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <div>Quantity</div>
                    {columns.quantity === 1 && <UpgradeIcon />}
                    {columns.quantity !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={btnHoverStyle}>
                  <Box
                    sx={flexCenter}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <div>Amount</div>
                    {columns.amount === 1 && <UpgradeIcon />}
                    {columns.amount !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                ?.filter((item) => isBrandSelected(item))
                .filter((item) => isProductSelected(item))
                .map((purchase, index) => (
                  <TableRow
                    key={purchase.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{purchase.date}</TableCell>
                    <TableCell align="center">{purchase.category}</TableCell>
                    <TableCell align="center">{purchase.firm}</TableCell>
                    <TableCell align="center">{purchase.product}</TableCell>
                    <TableCell align="center">{purchase.quantity}</TableCell>
                    <TableCell align="center">{purchase.amount}</TableCell>
                    <TableCell
                      align="center"
                      onClick={() => deletePurchase(purchase.id)}
                    >
                      <DeleteIcon sx={btnHoverStyle} />
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => putPurchase(purchase.id)}
                    >
                      <EditIcon sx={btnHoverStyle} />
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

export default Purchases;
