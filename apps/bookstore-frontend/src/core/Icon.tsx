import {FC} from "react";
import Add from '@mui/icons-material/Add';
import Back from "@mui/icons-material/ArrowBack";
import Clear from '@mui/icons-material/Clear';
import Edit from '@mui/icons-material/Edit';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Remove from '@mui/icons-material/Remove';
import Search from '@mui/icons-material/Search';
import Send from '@mui/icons-material/Send';
import SettingsApplications from '@mui/icons-material/SettingsApplications';
import Visibility from '@mui/icons-material/Visibility';

const icons = {
  actions: {
    add: Add,
    back: Back,
    clear: Clear,
    collapse: KeyboardArrowUp,
    edit: Edit,
    expand: KeyboardArrowDown,
    delete: Remove,
    details: Visibility,
    login: Login,
    logout: Logout,
    manage: SettingsApplications,
    search: Search,
    update: Send
  },
  states: {
    liked: Favorite,
    unliked: FavoriteBorder
  }
}

const Icon = ({
  name
}: { name: FC }) => {
  const IconComponent = name;

  return <IconComponent/>
}

export {
  icons,
  Icon
}
