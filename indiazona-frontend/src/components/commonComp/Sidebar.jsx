import React, { useEffect, useState } from 'react';
import { Drawer, Box, Divider, IconButton, useMediaQuery, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography, Slider, TextField, Button, Checkbox } from '@mui/material';
import axios from "axios";
import Test from "../../pages/Test/Test";

import { useTheme } from '@mui/material/styles';

import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  People,
  ShoppingCart,
  Receipt,
  AccountCircle,
  Notifications,
  Language,
  Menu,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styled from '@emotion/styled';

const drawerWidth = 270;

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    paddingLeft: 3,
    transition: "scrollbar-width 0.3s ease-in",
    overflowX: "auto", // Enable horizontal scrolling
    "&::-webkit-scrollbar": {
      height: "2px", // Thin scrollbar
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888", // Scrollbar color
      borderRadius: "10px", // Rounded edges
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555", // Darker color on hover
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent", // Transparent track
      borderRadius: "10px", // Rounded edges for the track
    },
    scrollbarWidth: "thin", // Thin scrollbar for Firefox
    scrollbarColor: "#cdcdcd transparent", // Firefox scrollbar colors


  },
}));


const Sidebar = ({ sidebarLinks, lightColor, mainColor, setCurrentLink }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    brand: "",
    color: "",
    page: 1,
    size: 4,
  });


  const [brands, setBrands] = useState(["Samsung", "Apple", "Xiaomi", "OnePlus", "Sony"]); // Example brands
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandCollapseOpen, setBrandCollapseOpen] = useState(false);

  const [colors, setColors] = useState(["Black", "White", "Blue", "Red", "Green"]); // Example colors
  const [selectedColors, setSelectedColors] = useState([]);
  const [colorCollapseOpen, setColorCollapseOpen] = useState(false);

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      // Create a clean filters object, excluding empty values
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "" && value !== null)
      );

      const response = await axios.get("http://localhost:8090/api/v1/products/list", {
        params: cleanFilters,
      });
      setProducts(response.data.data);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleBrandSelection = (brand) => {
    setSelectedBrands((prev) => {
      const updatedBrands = prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand];

      // Update the filters to include the selected brands
      setFilters((filters) => ({
        ...filters,
        brand: updatedBrands.join(","), // Convert array to comma-separated string
      }));

      return updatedBrands;
    });
  };

  const handleColorSelection = (color) => {
    setSelectedColors((prev) => {
      const updatedColors = prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color];

      // Update the filters to include the selected colors
      setFilters((filters) => ({
        ...filters,
        color: updatedColors.join(","), // Convert array to comma-separated string
      }));

      return updatedColors;
    });
  };


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  const [openSubmenu, setOpenSubmenu] = useState({});
  const location = useLocation();

  const handleSubmenuToggle = (menu) => {
    setOpenSubmenu((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };

  useEffect(() => {
    sidebarLinks.map((link, index) => {
      if (link?.children) {
        const name = link.name
        setOpenSubmenu((prevState) => {
          return { ...prevState, [name]: false }
        })
      }
    })
  }, []);


  return (
    <Box sx={{ position: "fixed", top: "64px", height: "calc(100vh - 64px)", zIndex: 10 }}>

      <DrawerStyled
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        open
      >
        <div>
          {/* <Toolbar /> */}
          <Box sx={{ width: "100%", py: 3, paddingLeft: 2 }}>
            <Box
              component="img"
              sx={{
                height: "80px",
              }}
              alt="Indiazona."
              src="/logo.svg"
            />
          </Box>

          <Box sx={{ width: "100%", py: 3, paddingLeft: 2 }}>
            <Typography gutterBottom>Price</Typography>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onChange={(e, newValue) => handleFilterChange("minPrice", newValue[0]) || handleFilterChange("maxPrice", newValue[1])}
              valueLabelDisplay="auto"
              min={0}
              max={20000}
            />
          </Box>

          <Box mt={2}>
            <List>
              <ListItemButton onClick={() => setBrandCollapseOpen(!brandCollapseOpen)}>
                <ListItemText primary="Brand" />
                {brandCollapseOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={brandCollapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {brands.map((brand) => (
                    <ListItem key={brand} disablePadding>
                      <Checkbox
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandSelection(brand)}
                      />
                      <ListItemText primary={brand} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </Box>

          <Box mt={2}>
            <List>
              <ListItemButton onClick={() => setColorCollapseOpen(!colorCollapseOpen)}>
                <ListItemText primary="Color" />
                {colorCollapseOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={colorCollapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {colors.map((color) => (
                    <ListItem key={color} disablePadding>
                      <Checkbox
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorSelection(color)}
                      />
                      <ListItemText primary={color} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </Box>

          {/* <Divider /> */}
          <List >
            {
              sidebarLinks.map((link, index) => {
                // const IconComponent = link.icon;
                const name = link.name.toLowerCase();
                if (!link?.children) {
                  return (
                    <ListItem
                      disablePadding
                      key={link.path}
                      component={NavLink}
                      onClick={() => setCurrentLink(link.name)}
                      to={link.path}
                      sx={{
                        color: location.pathname === link.path ? mainColor : "text.primary",
                        backgroundColor: location.pathname === link.path ? lightColor : "inherit",
                      }}
                    >
                      <ListItemButton >
                        {/* <ListItemIcon>
                  <IconComponent sx={{color:location.pathname === link.path ? mainColor : "currentColor"}} />
                </ListItemIcon> */}
                        <ListItemText primary={link.name} />
                      </ListItemButton>
                    </ListItem>
                  )
                } else return (
                  <>
                    <ListItem
                      disablePadding
                      sx={{
                        color: openSubmenu[name] ? mainColor : "text.primary",
                        backgroundColor: openSubmenu[name] ? "#F6F6F6" : "inherit",
                      }}
                    >
                      <ListItemButton onClick={() => {
                        handleSubmenuToggle(name);
                      }}>
                        {/* <ListItemIcon>
                  <IconComponent key={index} 
                  sx={{
                  color: openSubmenu[name] ? mainColor : "inherit",
                  }} />
                </ListItemIcon> */}
                        <ListItemText primary={link.name} />
                        {openSubmenu[name] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>

                    {link?.children && link.children.map((sublink) => {


                      return (
                        <Collapse in={openSubmenu[name]} timeout="auto" unmountOnExit>
                          <ListItem
                            disablePadding
                            key={link.path}
                            component={NavLink}
                            to={sublink.path}
                            onClick={() => setCurrentLink(link.name)}
                            sx={{
                              color: location.pathname === sublink.path ? mainColor : "text.primary",
                              backgroundColor: location.pathname === sublink.path ? lightColor : "inherit",
                            }}
                          >
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText >
                                <FiberManualRecordIcon sx={{ fontSize: "8px", mb: "1px" }} /> {sublink.name}
                              </ListItemText>

                            </ListItemButton>
                          </ListItem>
                        </Collapse>
                      )
                    })}

                  </>

                )
              })
            }
          </List>

          <Box sx={{ width: "100%", py: 3, paddingLeft: 9 }}>
            <Button variant="contained" color="primary" onClick={fetchProducts}>
              Apply Filters
            </Button>
          </Box>
        </div>
      </DrawerStyled>
    </Box>

  );
};

export default Sidebar;
