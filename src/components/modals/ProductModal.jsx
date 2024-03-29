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

export default function ProductModal({ open, setOpen, info, setInfo }) {
  const { postProduct, getBrands, getCategories } = useStockCalls();
  const { categories, brands } = useSelector((state) => state.stock);

  const handleSubmit = (e) => {
    e.preventDefault();
    postProduct(info);
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

  // console.log(brands, categories);

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
              <InputLabel id="demo-simple-select-label">Category</InputLabel>

              <Select
                label="Category"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={info?.category || ""}
                onChange={handleChange}
              >
                {categories?.map((category) => (
                  <MenuItem value={category.name || ""}>
                    {category.name || ""}
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

            <TextField
              label="Product Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              required
              value={info?.name || ""}
              onChange={handleChange}
            ></TextField>

            <Button type="submit" variant="contained">
              Add New Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
