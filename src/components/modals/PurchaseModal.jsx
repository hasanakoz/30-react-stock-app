import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { flexCenter, flexColumn, modalStyle } from "../../styles/globalStyles";
import {
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import useStockCalls from "../../hooks/useStockCalls";
import { useSelector } from "react-redux";

export default function PurchaseModal({ open, setOpen, info, setInfo }) {
  const { postPurchase } = useStockCalls();
  const { products, brands, firms } = useSelector((state) => state.stock);

  const handleSubmit = (e) => {
    e.preventDefault();
    postPurchase(info);
    setOpen(false);
    setInfo({});
  };
  // console.log(info);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  // useEffect(() => {
  //   getBrands();
  //   getCategories();
  // }, []);

  console.log(firms);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box component="form" onSubmit={handleSubmit} sx={flexColumn}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Firm</InputLabel>

              <Select
                label="Firm"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={info?.firm}
                onChange={handleChange}
              >
                {firms?.map((firm, key) => (
                  <MenuItem key={firm.id} value={firm?.name || ""}>
                    {firm?.name || ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>

              <Select
                label="Brand"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={info?.brand || ""}
                onChange={handleChange}
              >
                {brands?.map((brand) => (
                  <MenuItem value={brand.name || ""}>
                    {brand.name || ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>

              <Select
                label="Brand"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={info?.product || ""}
                onChange={handleChange}
              >
                {products?.map((product) => (
                  <MenuItem value={product.name || ""}>
                    {product.name || ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              name="quantity"
              id="quantity"
              type="text"
              variant="outlined"
              required
              value={info?.quantity || ""}
              onChange={handleChange}
            ></TextField>
            <TextField
              label="Price"
              name="price"
              id="prcie"
              type="text"
              variant="outlined"
              required
              value={info?.price || ""}
              onChange={handleChange}
            ></TextField>

            <Button type="submit" variant="contained">
              Add New Purchase
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
