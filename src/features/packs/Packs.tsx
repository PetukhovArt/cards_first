import * as React from "react";
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
import { useEffect, useState } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { addCardPackTC, deleteCardPackTC, fetchCardPacksTC } from "features/packs/packsSlice";
import { BearLoader } from "app/BearLoader/BearLoader";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SuperButton } from "common/components/super-button/SuperButton";
import { useDebounce } from "use-debounce";
import { SearchBar } from "features/packs/SearchBar";
import { makeStyles } from "@material-ui/styles";

export const Packs = () => {
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);
  const cardPacks = useAppSelector((state: RootState) => state.packs.cardPacks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  const dateFormat = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    return `${formattedDay}.${formattedMonth}.${year}`;
  };

  useEffect(() => {
    //если есть дебаунс то запрашиваем заного
    dispatch(
      fetchCardPacksTC({
        packName: debouncedSearchValue,
      })
    );
  }, [debouncedSearchValue]);
  const classes = useStyles();

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
          </div>
          <div className={s.slider}>
            <span>Number of cards</span>
          </div>
          <div className={s.resetFilter}></div>
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
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteOutlineIcon onClick={() => deletePackHandler(p._id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={s.paginationBlock}></div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
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
  cell_short: {
    maxWidth: "200px",
    overflowWrap: "break-word",
  },
}));
