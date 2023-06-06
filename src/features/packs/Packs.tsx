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
import { useEffect } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { fetchCardPacksTC } from "features/packs/packsSlice";
import { userThunks } from "features/user/userSlice";
import { RouteNames } from "routes/routes";

// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export const Packs = () => {
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);
  const cardPacks = useAppSelector((state: RootState) => state.packs.cardPacks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCardPacksTC({}));
  }, []);

  return (
    <div className={s.packs}>
      <div className={`container ${s.packsContainer}`}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Cards</TableCell>
                <TableCell align="right">Last updated</TableCell>
                <TableCell align="right">Created By</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardPacks.map((p) => (
                <TableRow key={p._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {p.name}
                  </TableCell>
                  <TableCell align="right">{p.cardsCount}</TableCell>
                  <TableCell align="right">{p.updated}</TableCell>
                  <TableCell align="right">{p.user_name}</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
