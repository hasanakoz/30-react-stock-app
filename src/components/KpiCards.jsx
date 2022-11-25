import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Box } from "@mui/system";
import { amber, indigo, pink } from "@mui/material/colors";
import { useSelector } from "react-redux";

const KpiCards = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const totalSales = sales
    ?.map((sale) => Number(sale.price_total))
    .reduce((acc, val) => acc + val, 0);

  const totalPurchases = purchases
    ?.map((purchase) => Number(purchase.price_total))
    .reduce((acc, val) => acc + val, 0);

  const totalProfit = totalSales - totalPurchases;

  const data = [
    {
      title: "sales",
      metric: `$${totalSales || ""}`,
      icon: <MonetizationOnIcon />,
      color: indigo[900],
      bgColor: indigo[100],
    },
    {
      title: "profit",
      metric: `$${totalProfit || ""}`,
      icon: <PaymentsIcon />,
      color: pink[900],
      bgColor: pink[100],
    },
    {
      title: "purchases",
      metric: `$${totalPurchases || ""}`,
      icon: <MonetizationOnIcon />,
      color: amber[900],
      bgColor: amber[100],
    },
  ];

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {data.map((item) => (
        <Grid item key={item.title} xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }} elevation={10}>
            <Box display="flex" gap={2}>
              <Avatar
                sx={{
                  width: "4rem",
                  height: "4rem",
                  color: item.color,
                  backgroundColor: item.bgColor,
                }}
              >
                {item.icon}
              </Avatar>
              <Box>
                <Typography variant="button">{item.title}</Typography>
                <Typography variant="h5">{item.metric} </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
