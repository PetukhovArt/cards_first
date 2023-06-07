import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

type SearchBarPropsType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchBar = ({ searchValue, setSearchValue }: SearchBarPropsType) => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 413, height: 33 }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Provide your text..."
        inputProps={{ "aria-label": "search packs" }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </Paper>
  );
};
