import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Slider, Checkbox, FormControlLabel, TextField, Button, Card, CardMedia, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Test = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    brand: "",
    color: "",
    page: 1,
    size: 4,
  });

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/v1/products/list?page=1&size=8");
      setProducts(response.data.data);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page on filter change
    }));
  };
  return (
    <Box sx={{ width: "100%", py: 0, paddingLeft: 40 }}>
      <Typography variant="h4" gutterBottom>
        Product Display Page
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Typography variant="h6">
            Showing {products.length} of {totalProducts} products
          </Typography>

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail_image_url}
                    alt={product.product_name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.product_name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.product_description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{product.tag_price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              disabled={filters.page === 1}
              onClick={() => handleFilterChange("page", filters.page - 1)}
            >
              Previous
            </Button>
            <Typography variant="body1" style={{ margin: "0 16px" }}>
              Page {filters.page}
            </Typography>
            <Button
              disabled={products.length < filters.size}
              onClick={() => handleFilterChange("page", filters.page + 1)}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Test
