import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import { RootState } from "app/store";
import { useNavigate } from "react-router-dom";
import s from "./Packs.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import {
  addCardPackTC,
  deleteCardPackTC,
  fetchCardPacksTC,
  updateCardPackTC,
} from "features/packs/packsSlice";
import { BearLoader } from "app/BearLoader/BearLoader";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SuperButton } from "common/components/super-button/SuperButton";
import { useDebounce } from "use-debounce";
import { SearchBar } from "features/packs/SearchBar";
import { makeStyles } from "@material-ui/styles";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export const Packs = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const cardPacks = useAppSelector((state: RootState) => state.packs.cardPacks);
  const packsCount = useAppSelector((state: RootState) => state.packs.cardPacksTotalCount);
  const minCardsCount = useAppSelector((state: RootState) =>
    state.packs.minCardsCount ? state.packs.minCardsCount : 0
  );
  const maxCardsCount = useAppSelector((state: RootState) =>
    state.packs.maxCardsCount ? state.packs.maxCardsCount : 100
  );
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const [page, setPage] = React.useState<number>(1); //pagination select page
  const [selectValue, setSelectValue] = React.useState<string>("6"); //select count of packs to show
  const [sliderValue, setSliderValue] = useState<number[]>([minCardsCount, maxCardsCount]);
  const packsPaginationCount: number = packsCount ? Math.ceil(packsCount / +selectValue) : 10;

  useEffect(() => {
    setSliderValue([minCardsCount, maxCardsCount]);
  }, [minCardsCount, maxCardsCount]);

  useEffect(() => {
    dispatch(
      fetchCardPacksTC({
        packName: debouncedSearchValue,
        page: page,
        pageCount: +selectValue,
        min: 0,
        max: 100,
        sortPacks: "", //0updated or 1updated
        user_id: "",
      })
    );
    // .unwrap()
    // .then(()=> {
    //   setSliderValue([minCardsCount,maxCardsCount])
    // })
  }, [page, debouncedSearchValue, selectValue, dispatch]);

  const resetFiltersHandler = () => {
    setPage(1);
    setSelectValue("6");
    setSearchValue("");
  };

  const onClickAddPack = () => {
    dispatch(
      addCardPackTC({
        name: "test14", //TODO hardcode
      })
    );
  };
  const deletePackHandler = (id: string) => {
    dispatch(deleteCardPackTC(id));
  };
  const updatePackHandler = (_id: string, name: string) => {
    dispatch(updateCardPackTC({ _id, name }));
  };

  const paginationChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value);
  };

  const sliderChangeHandler = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  return (
    <div className={s.packs}>
      <div className={`container ${s.packsContainer}`}>
        <div className={s.titleBlock}>
          <span className={s.title}>Packs List</span>
          <SuperButton name={"Add new pack"} onClickCallBack={onClickAddPack} />
        </div>
        <div className={s.actionsBlock}>
          <div className={s.search}>
            <span>Search</span>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
          <div className={s.showCards}>
            <span>Show packs cards</span>
            <div>
              <SuperButton name={"My"} />
              {/*//TODO buttons logic*/}
              <SuperButton name={"All"} />
            </div>
          </div>
          <div className={s.slider}>
            <span>Number of cards</span>
            <div className={s.sliderContent}>
              <div className={s.sliderNumber}>{sliderValue[0]}</div>
              <Box sx={{ width: 155 }}>
                <Slider
                  // min={minCardsCount}
                  // max={maxCardsCount}
                  valueLabelDisplay="auto"
                  value={sliderValue}
                  onChange={sliderChangeHandler}
                />
              </Box>
              <div className={s.sliderNumber}>{sliderValue[1]}</div>
            </div>
            {/*//TODO slider*/}
          </div>
          <div className={s.resetFilter}>
            <IconButton aria-label="filterOff" onClick={resetFiltersHandler}>
              <FilterAltOffIcon />
              {/*//TODO button logic reset filters*/}
            </IconButton>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#EFEFEF" }}>
              <TableRow>
                <TableCell sx={{ padding: "16px 16px 16px 36px" }}>Name</TableCell>
                <TableCell align="left">Cards</TableCell>
                <TableCell align="left">Last updated</TableCell>
                <TableCell align="left">Created By</TableCell>
                <TableCell align="left" sx={{ padding: "16px 36px 16px 16px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardPacks.map((p) => (
                <TableRow key={p._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ padding: "16px 16px 16px 36px" }}>
                    {p.name}
                  </TableCell>
                  <TableCell align="left">{p.cardsCount}</TableCell>
                  <TableCell align="left">{JSON.stringify(p.updated)}</TableCell>
                  <TableCell className={classes.cell_short} align="left">
                    {p.user_name}
                  </TableCell>
                  <TableCell align="left" sx={{ padding: "16px 28px 16px 8px" }}>
                    <IconButton aria-label="learn">
                      <SchoolIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => updatePackHandler(p._id, "updatedPack13")}
                      //TODO hardcoded name
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => deletePackHandler(p._id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={s.paginationBlock}>
          <Pagination
            shape={"rounded"}
            count={packsPaginationCount}
            color="primary"
            page={page}
            onChange={paginationChangeHandler}
          />
          <span>Show</span>
          <FormControl
          // sx={{ m: 1 }}
          >
            <Select value={selectValue} onChange={handleChange} autoWidth>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"8"}>8</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
            </Select>
          </FormControl>
          <span>Packs per page</span>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cell_short: {
    maxWidth: "200px",
    overflowWrap: "break-word",
  },
  // root: {
  //   width: 700,
  //   height: 600,
  //   backgroundColor: "#6a5acd",
  // },
  // table: {},
  // row: {
  //   width: 700,
  //   backgroundColor: "grey",
  // },
  // cell_long: {
  //   fontSize: "10px",
  //   width: 600,
  //   minWidth: 1,
  //   backgroundColor: "#ee82ee",
  // },
}));
